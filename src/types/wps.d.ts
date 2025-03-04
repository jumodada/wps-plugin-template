declare namespace WPS {
    interface Application {
        Documents: {
            Add(): Document;
            OpenFromUrl(url: string): void;
            Count: number;
        };
        ActiveDocument: Document | null;
        Selection: {
            Range: Range;
        };
        Enum: {
            msoCTPDockPositionLeft: number;
            msoCTPDockPositionRight: number;
        };
    }

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

declare global {
    interface Window {
        Application: WPS.Application;
        ribbon: typeof import('../wpsjs/ribbon').default;
    }

    interface WPS {
        // 根据实际需要定义WPS API的类型
    }
}

export {}; 