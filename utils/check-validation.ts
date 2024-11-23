import { IObject } from "../interface/common.interface";

export const isNull = (val: string | null | undefined | Array<any> | IObject) => {
  return (
    val === null ||
    val === undefined ||
    val === '' ||
    val === 'null' ||
    val === 'undefined' ||
    (val instanceof Object && Object.keys(val || {}).length === 0) ||
    (Array.isArray(val) && val?.length === 0)
  );
};
