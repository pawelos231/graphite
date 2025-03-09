import { ArrowLeftIcon, PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import { Fragment, useMemo } from "react";
import {
  Algorithm,
  AlgorithmParamDefinition,
  AlgorithmParamDefinitions,
  AlgorithmParamType,
  validateAlgorithmParams,
} from "~/core/simulator/algorithm";
import { Vertex } from "~/core/simulator/graph";
import { Controls, ControlsButton } from "~/shared/Controls";
import { Select } from "~/shared/ui/Select";
import { SpaceshipButton } from "~/shared/ui/SpaceshipButton";
import { useEditorStore } from "../context/editor";
import ReactMarkdown from "react-markdown";
import { ModeType } from "../store/editor";

export interface AlgorithmDetails {
  algorithm: Algorithm<NonNullable<unknown>>;
  onBack: () => void;
}

export function AlgorithmDetails({ algorithm, onBack }: AlgorithmDetails) {
  const { graph, mode, setMode, paramsValue, setParamsValue } = useEditorStore((storeState) => {
    const { graph, mode, setMode, algorithmParams, setAlgorithmParams } = storeState;
    return {
      graph,
      mode,
      setMode,
      paramsValue: algorithmParams,
      setParamsValue: setAlgorithmParams,
    };
  });

  const handleBackClicked = () => {
    setMode({ type: ModeType.IDLE });
    setParamsValue({});
    onBack();
  };

  const handleSetParamsValue = (
    paramName: keyof (typeof algorithm)["params"],
    newParamValue: string
  ) => {
    setParamsValue({ ...paramsValue, [paramName]: newParamValue });
  };

  const isParamValueValid = useMemo(() => {
    return validateAlgorithmParams(algorithm.params, paramsValue as Record<string, string>);
  }, [paramsValue, algorithm.params]);

  const loadSteps = () => {
    if (!isParamValueValid) return;
    const steps = algorithm.stepGenerator(graph, paramsValue);
    setMode({ type: ModeType.SIMULATION, steps });
  };

  const stopSimulation = () => {
    setMode({ type: ModeType.IDLE });
  };

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-900">
      <Controls
        alignment="start"
        className="border-b border-slate-300 dark:border-slate-600 dark:bg-slate-900"
      >
        <ControlsButton
          icon={<ArrowLeftIcon className="h-5 w-5 " />}
          onClick={handleBackClicked}
          label="back"
        />
      </Controls>
      <div className="relative flex flex-1 flex-col divide-y divide-slate-300 dark:divide-slate-700">
        <div className="flex flex-col gap-2 p-4">
          <span className="font-medium text-slate-800 dark:text-slate-50">{algorithm.name}</span>
          <p className="text-slate-600 dark:text-slate-300">{algorithm.description}</p>
        </div>
        <div className="flex flex-col gap-8 p-4">
          <div className="flex flex-col gap-2">
            <AlgorithmDetailParams<NonNullable<unknown>>
              paramDefinitions={algorithm.params}
              value={paramsValue}
              availableVertices={Object.values(graph.vertices)}
              onChange={handleSetParamsValue}
            />
          </div>
          <div className="flex justify-end bg-slate-50 dark:bg-slate-900">
            {mode.type === "IDLE" ? (
              <SpaceshipButton
                icon={<PlayIcon className="h-5 w-5" />}
                label="Run"
                disabled={!isParamValueValid}
                disabledHint="Fill all required fields"
                onClick={loadSteps}
              />
            ) : (
              <SpaceshipButton
                icon={<StopIcon className="h-5 w-5" />}
                label="Stop"
                onClick={stopSimulation}
              />
            )}
          </div>
        </div>
        <div>
          <div className="prose prose-slate p-4 dark:prose-invert">
            <ReactMarkdown>{algorithm.guide}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AlgorithmDetailParamsProps<T extends object> {
  paramDefinitions: AlgorithmParamDefinitions<T>;
  value: Record<keyof T, string>;
  onChange?: (paramName: keyof T, value: string) => void;
  availableVertices?: Vertex[];
}

function AlgorithmDetailParams<T extends object>(props: AlgorithmDetailParamsProps<T>) {
  const handleSelectChange = (paramName: keyof T, newValue: string) => {
    props.onChange?.(paramName, newValue);
  };
  const renderSelect = (paramName: keyof T, paramType: AlgorithmParamType<any>) => {
    let dropdownValues: string[] = [];
    if (paramType === "vertex") {
      dropdownValues = (props.availableVertices ?? []).map((vertex) => vertex.id);
    }
    return (
      <Select
        label={String(paramName)}
        value={props.value[paramName]}
        onChange={(newValue) => handleSelectChange(paramName, newValue)}
        values={dropdownValues}
      />
    );
  };

  const renderedParams = Object.entries(props.paramDefinitions).map((paramEntry) => {
    const paramName = paramEntry[0] as keyof T;
    const paramDefinition = paramEntry[1] as AlgorithmParamDefinition<any>;
    return (
      <Fragment key={String(paramName)}>
        <span className="bg:salmon-50 text-slate-800  dark:text-slate-50">
          {String(paramName)}
          {paramDefinition.required && <span className="text-blue-500">*</span>}
        </span>
        {renderSelect(paramName, paramDefinition.type)}
      </Fragment>
    );
  });

  return <>{renderedParams}</>;
}
