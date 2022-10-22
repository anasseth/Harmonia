export interface DashboardPage {
    containerGuidKey: string;
    homePageTemplate: string;
    pageID: number;
    dashboardPageID: number;
    version: number;
    name: string;
    nodeName: string;
    siteID: number | null;
    entityId: string;
    entityTypeId: number | null;
    linkedScale: boolean | null;
    linkedLegendWidth: boolean | null;
    dashboardPageSetting: DashboardPageSetting;
}

export interface DashboardPageSetting {
    unweightedSampleSize: boolean | null;
    effectiveBase: boolean | null;
    disableUserReferenceInteraction: boolean | null;
    isZoomed: boolean | null;
}

export interface PageContainer {
    pageID: number;
    pageContainerID: number;
    name: string;
    tag: string;
    containerPosition: ContainerPosition;
    containerPadding: ContainerPadding;
    zoomable: boolean;
    zIndex: number;
    isZoomed: boolean;
    analysisID: number | null;
    pageContainerType: any;
    content: { [key: string]: string; };
    settings: { [key: string]: string; };
}

export interface ContainerPosition {
    top: number;
    height: number;
    width: number;
    left: number;
}

export interface ContainerPadding {
    top: number;
    bottom: number;
    right: number;
    left: number;
}

