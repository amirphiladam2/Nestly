declare module 'react-native-onboarding-swiper' {
    import { ReactNode , Component } from 'react';
    import { ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';

    export interface Page {
        backgroundColor: string;
        image: ReactNode;
        title: ReactNode;
        subtitle: ReactNode;
        titleStyles?: TextStyle;
        subTitleStyles?: TextStyle;
    }

    export interface Props {
        pages: Page[];
        onDone?: () => void;
        onSkip?: () => void;
        bottomBarHeight?: number;
        bottomBarColor?: string;
        showPagination?: boolean;
        showDone?: boolean;
        showSkip?: boolean;
        showNext?: boolean;
        controlStatusBar?: boolean;
        // Add other props as needed based on library documentation
    }

    
    class Onboarding extends Component<Props> {}
    export default Onboarding;
}