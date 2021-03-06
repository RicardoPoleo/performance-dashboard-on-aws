import { v4 as uuidv4 } from "uuid";
import {
  Widget,
  WidgetType,
  WidgetItem,
  TextWidget,
  ChartWidget,
  TableWidget,
  ChartType,
} from "../models/widget";

export const WIDGET_ITEM_TYPE = "Widget";
export const WIDGET_PREFIX = "Widget#";
export const DASHBOARD_PREFIX = "Dashboard#";

function createWidget(
  name: string,
  dashboardId: string,
  widgetType: WidgetType,
  content: any,
  id = uuidv4()
): Widget {
  switch (widgetType) {
    case WidgetType.Text:
      return createTextWidget(id, name, dashboardId, content);
    case WidgetType.Chart:
      return createChartWidget(id, name, dashboardId, content);
    case WidgetType.Table:
      return createTableWidget(id, name, dashboardId, content);
    default:
      throw new Error("Invalid widget type");
  }
}

function createFromWidget(dashboardId: string, widget: Widget): Widget {
  // Creates a new Widget based on an existing one.
  return {
    id: uuidv4(),
    name: widget.name,
    widgetType: widget.widgetType,
    dashboardId, // associate new widget to the given dashboardId
    order: widget.order,
    updatedAt: new Date(),
    content: widget.content,
  };
}

function fromItem(item: WidgetItem): Widget {
  const id = item.sk.substring(WIDGET_PREFIX.length);
  const dashboardId = item.pk.substring(DASHBOARD_PREFIX.length);
  const updatedAt = item.updatedAt ? new Date(item.updatedAt) : new Date();
  const widget: Widget = {
    id,
    dashboardId,
    name: item.name,
    widgetType: item.widgetType as WidgetType,
    order: item.order,
    updatedAt,
    content: item.content,
  };

  switch (item.widgetType) {
    case WidgetType.Text:
      return widget as TextWidget;
    case WidgetType.Chart:
      return widget as ChartWidget;
    case WidgetType.Table:
      return widget as TableWidget;
    default:
      return widget;
  }
}

function fromItems(items: Array<WidgetItem>): Array<Widget> {
  return items.map((item) => fromItem(item));
}

function toItem(widget: Widget): WidgetItem {
  return {
    pk: itemPk(widget.dashboardId),
    sk: itemSk(widget.id),
    name: widget.name,
    widgetType: widget.widgetType.toString(),
    type: WIDGET_ITEM_TYPE,
    order: widget.order,
    updatedAt: widget.updatedAt?.toISOString(),
    content: widget.content,
  };
}

function createTextWidget(
  id: string,
  name: string,
  dashboardId: string,
  content: any
): TextWidget {
  if (!content.text) {
    throw new Error("Text widget must have `content.text` field");
  }

  return {
    id,
    name,
    dashboardId,
    widgetType: WidgetType.Text,
    order: 0,
    updatedAt: new Date(),
    content: {
      text: content.text,
    },
  };
}

function createChartWidget(
  id: string,
  name: string,
  dashboardId: string,
  content: any
): ChartWidget {
  if (!content.title) {
    throw new Error("Chart widget must have `content.title` field");
  }

  if (!content.chartType) {
    throw new Error("Chart widget must have `content.chartType` field");
  }

  if (!(content.chartType in ChartType)) {
    throw new Error("Invalid chart type");
  }

  if (!content.datasetId) {
    throw new Error("Chart widget must have `content.datasetId` field");
  }

  if (!content.s3Key) {
    throw new Error("Chart widget must have `content.s3Key` field");
  }

  if (!content.fileName) {
    throw new Error("Chart widget must have `content.fileName` field");
  }

  return {
    id,
    name,
    dashboardId,
    widgetType: WidgetType.Chart,
    order: 0,
    updatedAt: new Date(),
    content: {
      title: content.title,
      chartType: content.chartType,
      datasetId: content.datasetId,
      summary: content.summary,
      s3Key: content.s3Key,
      fileName: content.fileName,
      datasetType: content.datasetType,
    },
  };
}

function createTableWidget(
  id: string,
  name: string,
  dashboardId: string,
  content: any
): TableWidget {
  if (!content.title) {
    throw new Error("Table widget must have `content.title` field");
  }

  if (!content.datasetId) {
    throw new Error("Table widget must have `content.datasetId` field");
  }

  if (!content.s3Key) {
    throw new Error("Table widget must have `content.s3Key` field");
  }

  if (!content.fileName) {
    throw new Error("Table widget must have `content.fileName` field");
  }

  return {
    id,
    name,
    dashboardId,
    widgetType: WidgetType.Table,
    order: 0,
    updatedAt: new Date(),
    content: {
      title: content.title,
      datasetId: content.datasetId,
      summary: content.summary,
      s3Key: content.s3Key,
      fileName: content.fileName,
      datasetType: content.datasetType,
    },
  };
}

// Returns the PK for a widget item in DynamoDB
function itemPk(dashboardId: string): string {
  return DASHBOARD_PREFIX.concat(dashboardId);
}

// Returns the SK for a widget item in DynamoDB
function itemSk(widgetId: string): string {
  return WIDGET_PREFIX.concat(widgetId);
}

export default {
  createWidget,
  createFromWidget,
  fromItem,
  fromItems,
  toItem,
  itemPk,
  itemSk,
};
