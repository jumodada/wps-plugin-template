/// <reference types="wps-jsapi-declare" />

declare global {
    declare namespace WPS {
        interface Document {
            Name: string;
            Range(start: number, end: number): Range;
            Close(): void;
        }
    
        interface Range {
            Text: string;
            Select(): void;
        }
    
        interface TaskPane {
            ID: string;
            Visible: boolean;
            DockPosition: number;
        }
    }
    interface Window {
        _Application: import('wps-jsapi-declare').WpsApplication;
        ribbon: typeof import('../wpsjs/ribbon').default;
        openOfficeFileFromSystemDemo: any
        InvokeFromSystemDemo: any
    }
}

export {};