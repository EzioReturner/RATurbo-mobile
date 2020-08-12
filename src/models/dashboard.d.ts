declare interface ParamsArea {
  id: string; // 唯一标识
  includeOtherDimension: boolean;
  mainTimeLine: boolean; // 是否主时间维度
  name: string;
  paramType: 'selector' | 'linkSelector' | 'daterange';
  filterGroup?: any; // 筛选组
  filtersFromFilterGroup?: any[];
  baseDimensionId?: string; // 基础维度id
  dimensionGroupId?: string;
  dimensionGroupType?: string;
}

declare interface SelectParamsArea extends ParamsArea {
  paramType: 'selector';
  selectorConfig: {
    defaultValues: any[];
  };
}

declare interface DateParamsArea extends ParamsArea {
  paramType: 'daterange';
  identity: 'TIME_DIMENSION'; //标志
  dateConfig: any;
}

declare interface LinkParamsArea extends ParamsArea {
  paramType: 'linkSelector';
  linkageId: string; // 联动组合id
  linkageName: string; // 联动组合名称
  dataBoardDimensionLinkages: any[]; // 联动层级
  $_link?: any; // 当前操作的联动项
}

declare type FilterParams = SelectParamsArea | DateParamsArea | LinkParamsArea;

declare interface SelectorItem {
  label: string;
  value: any;
  key?: any; // 后端返回key ，value；前端使用label字段作为文字展示
}
