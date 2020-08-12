import React, { useState, useEffect } from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import RAPagination from '@components/Pagination';
import { sortData } from '@utils/charts';
import { format } from '@utils/format';
import EmptyData from '@components/EmptyData';
import './index.less';

interface RATable {
  columns: { title: string; sort?: string; formatter?: string }[]; // 表格列维信息
  tableData: any[]; // 表格数据源
  fixedSize?: number; // 固定滚动列数
}

// 排序切换顺序映射
const SORT_INDEX: StoreKeyValue = {
  '': 'asc',
  asc: 'dsc',
  dsc: ''
};

const RATable: React.FC<RATable> = props => {
  const { columns, tableData, fixedSize } = props;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortArr, setSortArr] = useState<string[]>([]);
  const [orderedData, setOrderedData] = useState<any[]>([]);

  let _fixedSize = fixedSize ? Math.floor(fixedSize) : 0;

  useEffect(() => {
    setSortArr(columns.map(col => col.sort || ''));
  }, [columns]);

  useEffect(() => {
    setOrderedData(tableData);
  }, [tableData]);

  const handleChangeSort = (index: number) => {
    // 同时只有一列排序
    let _sortArr = sortArr.map(() => '');
    // 切换后的排序规则
    _sortArr[index] = SORT_INDEX[sortArr[index]];
    setSortArr(_sortArr);
    const _orderedData = sortData(_sortArr, orderedData, false);
    setOrderedData(_orderedData);
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const ColHeader = (data: any) => {
    const { title, index } = data;
    return (
      <div className="RATable-row RATable-header" onClick={() => handleChangeSort(index)}>
        <div className="row-text">{title}</div>
        <div className="header-sort">
          <div className="header-sort-inner">
            <CaretUpOutlined
              className={classnames(
                'headr-sort-icon',
                'sort-up',
                sortArr[index] === 'asc' && 'active'
              )}
            />
            <CaretDownOutlined
              className={classnames(
                'headr-sort-icon',
                'sort-down',
                sortArr[index] === 'desc' && 'active'
              )}
            />
          </div>
        </div>
      </div>
    );
  };

  const ColRender = (colList: any[], slicedData: any[]) => {
    return (
      <>
        {colList.map((col: any) => {
          return (
            <div className="RATable-col" key={col.title}>
              {ColHeader({ title: col.title, index: col.index })}
              {slicedData.map((td, index) => {
                return (
                  <div className="RATable-row" key={index}>
                    {td[col.index] ? (
                      <div className="row-text">
                        {col.formatter && td[col.index] !== '-'
                          ? format(td[col.index], col.formatter)
                          : td[col.index]}
                      </div>
                    ) : (
                      '-'
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  const TableCol = () => {
    const slicedData = orderedData.slice((page - 1) * pageSize, page * pageSize);
    if (_fixedSize) {
      const fixedCol = columns.slice(0, _fixedSize);
      const scrollCol = columns.slice(_fixedSize);
      return (
        <div className="RATable-body-content fixed">
          <div className="RATable-fixed-container">{ColRender(fixedCol, slicedData)}</div>
          <div className="RATable-scroll-container">{ColRender(scrollCol, slicedData)}</div>
        </div>
      );
    } else {
      return <div className="RATable-body-content">{ColRender(columns, slicedData)}</div>;
    }
  };

  const TableBody = <div className="RATable-body">{TableCol()}</div>;

  return (
    <div className="RATable">
      <div className="RATable-wrapper">
        {TableBody}
        {orderedData.length === 0 && (
          <EmptyData
            propStyle={{
              position: 'absolute',
              left: '50%',
              top: '55%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
      </div>
      {orderedData.length !== 0 && (
        <div className="RATable-pagination">
          <RAPagination
            total={orderedData.length}
            pageSize={pageSize}
            current={page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default RATable;
