import { v4 as uuidv4 } from "uuid";
import { Dataset, DatasetItem, SourceType } from "../models/dataset";

const DATASET_ITEM_TYPE = "Dataset";

type DatasetInfo = {
  fileName: string;
  createdBy: string;
  s3Key: {
    raw: string;
    json: string;
  };
  sourceType: SourceType;
};

function createNew(info: DatasetInfo): Dataset {
  return {
    id: uuidv4(),
    fileName: info.fileName,
    createdBy: info.createdBy,
    s3Key: {
      raw: info.s3Key.raw,
      json: info.s3Key.json,
    },
    updatedAt: new Date(),
    sourceType: info.sourceType,
  };
}

function fromItem(item: DatasetItem): Dataset {
  const id = item.pk.substring(8);
  let dataset: Dataset = {
    id,
    fileName: item.fileName,
    createdBy: item.createdBy,
    s3Key: item.s3Key,
    updatedAt: item.updatedAt ? new Date(item.updatedAt) : new Date(),
    sourceType: item.sourceType
      ? (item.sourceType as SourceType)
      : SourceType.FileUpload,
  };
  return dataset;
}

function toItem(dataset: Dataset): DatasetItem {
  return {
    pk: itemId(dataset.id),
    sk: itemId(dataset.id),
    type: DATASET_ITEM_TYPE,
    createdBy: dataset.createdBy,
    fileName: dataset.fileName,
    s3Key: dataset.s3Key,
    updatedAt: dataset.updatedAt
      ? dataset.updatedAt.toISOString()
      : new Date().toISOString(),
    sourceType: dataset.sourceType,
  };
}

function itemId(id: string): string {
  return `${DATASET_ITEM_TYPE}#${id}`;
}

export default {
  createNew,
  fromItem,
  toItem,
  itemId,
};
