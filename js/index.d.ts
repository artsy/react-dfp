import React from 'react';

export type AdSlotProps = {
  dfpNetworkId: string;
  adUnit: string;
  sizes: Array<number[] | string>;
  sizeMapping: Array<{
    viewport: [number, number];
    sizes: Array<number[] | string>;
  }>;
  className?: string;
  targetingArguments?: Record<string, string | null>;
  onSlotRender?: (params: { slotId: string }) => void;
  onSlotRegister?: (params: { slotId: string }) => void;
  onSlotIsViewable?: (params: { slotId: string }) => void;
  onSlotVisibilityChanged?: (params: { slotId: string }) => void;
  shouldRefresh?: (ctx: { slotId: string }) => boolean;
  slotId?: string;
  fetchNow?: boolean;
  adSenseAttributes?: Record<string, string>;
  collapseEmptyDivs?: boolean;
  lazyLoad?: boolean;
  limitedAds?: boolean;
  autoLoad?: boolean;
  autoReload?: AutoReloadConfig;
};

export type AutoReloadConfig = {
  dfpNetworkId?: boolean;
  personalizedAds?: boolean;
  cookieOption?: boolean;
  singleRequest?: boolean;
  disableInitialLoad?: boolean;
  adUnit?: boolean;
  sizeMapping?: boolean;
  adSenseAttributes?: boolean;
  targetingArguments?: boolean;
  collapseEmptyDivs?: boolean;
  lazyLoad?: boolean;
  limitedAds?: boolean;
};

export function AdSlot(props: AdSlotProps): React.ReactElement;

export type DFPSlotsProviderProps = {
  children: React.ReactNode;
  dfpNetworkId: string;
  dfpAdUnit: string;
  dfpSizeMapping: Array<{
    viewport: [number, number];
    sizes: Array<number[] | string>;
  }>;
  dfpTargetingArguments: Record<string, string>;
};

export function DFPSlotsProvider(
  props: DFPSlotsProviderProps,
): React.ReactElement;

export class DFPManager {
  static configurePersonalizedAds: (personalizedAds: boolean) => void;
  static configureCookieOption: (cookieOption: boolean) => void;
  static configureSingleRequest: (singleRequest: boolean) => void;
  static configureDisableInitialLoad: (disableInitialLoad: boolean) => void;
  static configureLazyLoad: (
    lazyLoad: boolean,
    lazyLoadConfig: LazyLoadConfig | null,
  ) => void;
  static setAdSenseAttributes: (
    adSenseAttributes: Record<string, string>,
  ) => void;
  static setCollapseEmptyDivs: (collapseEmptyDivs: boolean) => void;
  static configureLimitedAds: (limitedAds: boolean) => void;
  static getTargetingArguments: () => Record<string, string | null>;
  static setTargetingArguments: (
    targetingArguments: Record<string, string | string[] | null>,
  ) => void;
  static refresh: () => void;
}
