import {LonLat, SelectionWithLocalizedTypeName, WmeSDK, ZoomLevel} from "wme-sdk-typings";

declare global {
  interface Window {
    getWmeSdk(info: {
        scriptId: string;
        scriptName: string;
        version: string;
    }): WmeSDK;
    unsafeWindow?: Window;
    SDK_INITIALIZED: Promise<void>;
    indexedDB: IDBFactory;
    openDatabase?: (name: string, version: string, description: string, size: number, callback?: () => void) => any;
  }

  const I18n: any;
  const $: JQueryStatic;
  const GM_info: {
    script: {
      name: string;
      version: string;
    };
  };

  type WazeJqueryElement = JQuery<any>  & {
    tooltip: (config: { trigger?: string, position?: string }) => any;
  };

  type SelectionHistoryItem = SelectionWithLocalizedTypeName & {
    id: number;
    selectTime: Date;
    center: LonLat;
    zoom: ZoomLevel;
  }

  type SavedSelection = SelectionHistoryItem & {
    name: string;
  }

  interface ScriptOptions {
    lastAnnouncedVersion: string;
    maxHistory: number;
    showHotbarIcon: boolean;
    clearRolledBackOnNew: boolean;
    activeSelectionTypes: string[];
  }

  const WazeWrap: {
    Ready: boolean;
    Interface: {
      ShowScriptUpdate(
          scriptName: string,
          version: string,
          changelog: string,
          url: string
      ): void;
    };
  };

  function getWmeSdk(options: { scriptId: string; scriptName: string, version: string }): WmeSDK;
}

export {};