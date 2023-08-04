import { useEffect, useRef, useState } from "react";
import { BottomPane } from "~/shared/layout/BottomPane";
import { useEditorStore } from "../context/editor";
import { ControlledSvg } from "../../../shared/layout/controlled-svg/ControlledSvg";
import { StepStateTable } from "./StepStateTable";
import { AlgorithmControls } from "./AlgorithmControls";
import { State } from "~/core/simulator/algorithm";

export const Visualizer = () => {
  const visualizerRef = useRef(null);

  const { mode, graph } = useEditorStore(({ mode, graph }) => ({
    mode,
    graph,
  }));

  const [currentStepIndex, setCurrentStep] = useState(0);

  // TODO: We might want to do this differently
  useEffect(() => {
    setCurrentStep(0);
  }, [mode]);

  const highlights =
    mode.type === "SIMULATION"
      ? mode.steps[currentStepIndex].highlights
      : undefined;

  const renderStepState = (state: State) => {
    if (!state) return null;

    switch (state.type) {
      case "table":
        return <StepStateTable state={state} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col" ref={visualizerRef}>
      <ControlledSvg
        controls={(zoom, center, setZoom, setCenter) => {
          return (
            <>
              <p>zoom is {zoom}</p>
              <p>center is at {center.join(",")}</p>
              <button
                className="pointer-events-auto"
                onClick={() => {
                  setCenter([0, 0]);
                  setZoom(1);
                }}
              >
                my button
              </button>
            </>
          );
        }}
      >
        <rect x={0} y={0} width={20} height={20} fill="blue" />
      </ControlledSvg>
      {mode.type === "SIMULATION" && (
        <BottomPane parentRef={visualizerRef}>
          <div className="flex h-full w-full flex-col divide-y divide-slate-300">
            <AlgorithmControls
              currentStep={currentStepIndex}
              onStepChange={setCurrentStep}
              numberOfSteps={mode.steps.length}
              playerSettings={{
                speed: 1.5 * 1000,
              }}
            />
            <div className="flex flex-col gap-1 p-4">
              <span className="font-bold text-slate-800">
                Step {currentStepIndex + 1} / {mode.steps.length}
              </span>
              <p className="text-slate-800">
                {mode.steps[currentStepIndex].description}
              </p>
            </div>
            {renderStepState(mode.steps[currentStepIndex].state)}
          </div>
        </BottomPane>
      )}
    </div>
  );
};
