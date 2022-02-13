export interface Header {
  id?: string;
  key: string;
  title: string;
  prefix: string;
  suffix: string;
  decimals: number;
}

export interface Meta {
  key: string;
  title: string;
}

export interface DataValue {
  k: string;
  v: number;
}

export interface Config {
  key: string;
  showPlot: boolean;
  showValue: boolean;
  isHidden: boolean;
}

export interface SubEntityData {
  id: string;
  header: string;
  entityDetails: {
    browser: string;
    value: number;
  }[];
}
