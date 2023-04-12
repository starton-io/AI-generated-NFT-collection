/*
| Developed by Starton
| Filename : old_theme.ts
*/

import { createTheme } from '@mui/material'
import { TypographyStyleOptions } from '@mui/material/styles/createTypography'

/** Customize module **/
declare module '@mui/material/styles' {
	/** Custom theme interface **/
	interface CustomThemeInterface {
		fontSizeBase: number
		fontSizes?: {
			xs: TypographyStyleOptions
			sm: TypographyStyleOptions
			md: TypographyStyleOptions
			lg: TypographyStyleOptions
			xl: TypographyStyleOptions
			xl2: TypographyStyleOptions
			xl3: TypographyStyleOptions
			xl4: TypographyStyleOptions
			xl5: TypographyStyleOptions
			xl6: TypographyStyleOptions
		}
	}

	interface Theme extends CustomThemeInterface {}
	interface ThemeOptions extends CustomThemeInterface {}

	/** Custom typographies **/
	interface CustomTypographyOptions {
		body0?: TypographyStyleOptions
		button1?: TypographyStyleOptions
		button2?: TypographyStyleOptions
		menu?: TypographyStyleOptions
		'table-colHeader'?: TypographyStyleOptions
		'table-sectionTitle'?: TypographyStyleOptions
		'table-rowHeader'?: TypographyStyleOptions
		'table-cell'?: TypographyStyleOptions
		'table-caption'?: TypographyStyleOptions
		'card-title'?: TypographyStyleOptions
		'card-kpi'?: TypographyStyleOptions
		'card-descr'?: TypographyStyleOptions
		'card-caption'?: TypographyStyleOptions
	}

	// For `Theme`
	interface Palette {
		tertiary: Palette['primary']
		quaternary: Palette['primary']
	}
	interface PaletteOptions {
		tertiary: PaletteOptions['primary']
		quaternary: Palette['primary']
	}
	// For `PaletteColorOptions`
	interface SimplePaletteColorOptions {
		tertiary?: string
		lighter?: string
	}
	// For `TypeBackground`
	interface TypeBackground {
		dark: string
		disabled: string
		disabledButton: string
	}
	interface TypeText {
		disabledButton: string
	}
	// For `TypeAction`
	interface TypeAction {
		overlay: string
	}

	interface PaletteColor {
		lighter?: string
	}

	interface TypographyVariants extends CustomTypographyOptions {}
	interface TypographyVariantsOptions extends CustomTypographyOptions {}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		body0?: true
		button1?: true
		button2?: true
		menu?: true
		'table-colHeader'?: true
		'table-sectionTitle'?: true
		'table-rowHeader'?: true
		'table-cell'?: true
		'table-caption'?: true
		'card-title'?: true
		'card-kpi'?: true
		'card-descr'?: true
		'card-caption'?: true
	}
}

interface ExtendedPropsColorOverrides {
	tertiary?: true
	quaternary?: true
}

declare module '@mui/material/Chip' {
	interface ChipPropsColorOverrides extends ExtendedPropsColorOverrides {}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides extends ExtendedPropsColorOverrides {}
}

/** Theme initialisation **/
const startonDarkTheme = createTheme({
	fontSizeBase: 8,
	spacing: (factor: number) => `${Number(factor) * startonDarkTheme.fontSizeBase}px`,
	palette: {
		mode: 'dark',
		divider: '#3E4E5C',
		primary: {
			main: '#f3f5f7',
			dark: '#C2CDD6',
			light: '#ffffff',
			contrastText: '#0E1114',
		},
		secondary: {
			main: '#01E6CD',
			dark: '#01B29E',
			light: '#E6FFFC',
			contrastText: '#0E1114',
		},
		tertiary: {
			main: '#3E4E5C',
			dark: '#29343D',
			light: '#52687A',
			contrastText: '#ffffff',
		},
		quaternary: {
			main: '#0E1114',
			dark: '#151A1F',
			light: '#52687A',
			contrastText: '#ffffff',
		},
		error: {
			main: '#F6547B',
			dark: '#F53D69',
			light: '#F986A2',
			lighter: '#FCCFDA',
			contrastText: '#ffffff',
		},
		warning: {
			main: '#E67E22',
			dark: '#C06616',
			light: '#EB9951',
			lighter: '#F9E2CD',
			contrastText: '#ffffff',
		},
		info: {
			main: '#0A9DF0',
			dark: '#087DBF',
			light: '#54BDF8',
			lighter: '#B6E3FC',
			contrastText: '#ffffff',
		},
		success: {
			main: '#0CB080',
			dark: '#07694C',
			light: '#0EC790',
			lighter: '#CFFCEE',
			contrastText: '#0E1114',
		},
		text: {
			primary: '#ffffff',
			secondary: '#A3B4C1',
			disabled: '#859BAD',
			disabledButton: '#678298',
		},
		background: {
			paper: '#151A1F',
			default: '#0E1114',
			dark: '#1F272E',
			disabledButton: '#C2CDD6',
			disabled: 'rgba(255,255,255,0.2)',
		},
		action: {
			hover: 'rgba(30,34,36,0.05)',
			focus: 'rgba(255,255,255,0.2)',
			overlay: 'rgba(30,34,36,0.6)',
		},
	},
	components: {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					subtitle1: 'p',
				},
			},
		},
	},
})

/** Font sizes **/
startonDarkTheme.fontSizes = {
	/** Mobile sizes **/
	xs: {
		fontSize: startonDarkTheme.fontSizeBase * 1.75,
		[startonDarkTheme.breakpoints.down('md')]: {
			fontSize: startonDarkTheme.fontSizeBase * 1.375,
		},
	},
	sm: {
		fontSize: startonDarkTheme.fontSizeBase * 2,
		[startonDarkTheme.breakpoints.down('md')]: {
			fontSize: startonDarkTheme.fontSizeBase * 1.5,
		},
	},
	md: {
		fontSize: startonDarkTheme.fontSizeBase * 2.5,
		[startonDarkTheme.breakpoints.down('md')]: {
			fontSize: startonDarkTheme.fontSizeBase * 1.75,
		},
	},
	lg: {
		fontSize: startonDarkTheme.fontSizeBase * 3,
		[startonDarkTheme.breakpoints.down('md')]: {
			fontSize: startonDarkTheme.fontSizeBase * 2,
		},
	},
	xl: {
		fontSize: startonDarkTheme.fontSizeBase * 3.5,
		[startonDarkTheme.breakpoints.down('md')]: {
			fontSize: startonDarkTheme.fontSizeBase * 2.25,
		},
	},
	xl2: {
		fontSize: startonDarkTheme.fontSizeBase * 5,
		[startonDarkTheme.breakpoints.down('md')]: {
			fontSize: startonDarkTheme.fontSizeBase * 2.5,
		},
	},
	xl3: {
		fontSize: startonDarkTheme.fontSizeBase * 6,
		[startonDarkTheme.breakpoints.down('md')]: {
			fontSize: startonDarkTheme.fontSizeBase * 2.75,
		},
	},
	xl4: {
		fontSize: startonDarkTheme.fontSizeBase * 9,
		[startonDarkTheme.breakpoints.down('md')]: {
			fontSize: startonDarkTheme.fontSizeBase * 3.25,
		},
	},
	xl5: {
		fontSize: startonDarkTheme.fontSizeBase * 10,
		[startonDarkTheme.breakpoints.down('md')]: {
			fontSize: startonDarkTheme.fontSizeBase * 3.5,
		},
	},
	xl6: {
		fontSize: startonDarkTheme.fontSizeBase * 12,
		[startonDarkTheme.breakpoints.down('md')]: {
			fontSize: startonDarkTheme.fontSizeBase * 4,
		},
	},
}

/** Font families **/
const typographyFontFamily = ['Fira Code', 'Fira Code VF', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(',')
const typographyFontTitleFamily = ['PP-Neue-Machina', 'Kiwari-Mono', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
	',',
)

/** Typography styles **/
startonDarkTheme.typography = {
	...startonDarkTheme.typography,
	h1: {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 600,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.xl4,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	h2: {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 600,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.xl3,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	h3: {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 600,
		lineHeight: '140%',
		...startonDarkTheme.fontSizes.xl,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	h4: {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 600,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.lg,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	h5: {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 600,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.md,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	h6: {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 600,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.sm,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	subtitle1: {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 400,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.xl3,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	body0: {
		fontFamily: typographyFontFamily,
		fontWeight: 400,
		lineHeight: '100%',
		...startonDarkTheme.fontSizes.xl,
		letterSpacing: '-0.2px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	body1: {
		fontFamily: typographyFontFamily,
		fontWeight: 400,
		lineHeight: '140%',
		...startonDarkTheme.fontSizes.md,
		letterSpacing: '-0.8px',
		textDecoration: 'none',
		textTransform: 'none',
	},
	body2: {
		fontFamily: typographyFontFamily,
		fontWeight: 400,
		lineHeight: '140%',
		...startonDarkTheme.fontSizes.sm,
		letterSpacing: '-0.8px',
		textDecoration: 'none',
		textTransform: 'none',
	},
	caption: {
		fontFamily: typographyFontFamily,
		fontWeight: 400,
		lineHeight: '140%',
		...startonDarkTheme.fontSizes.xs,
		letterSpacing: '-0.8px',
		textDecoration: 'none',
		textTransform: 'none',
	},
	button1: {
		fontFamily: typographyFontFamily,
		fontWeight: 700,
		lineHeight: '90%',
		...startonDarkTheme.fontSizes.lg,
		letterSpacing: '0px',
		textTransform: 'uppercase',
		textDecoration: 'none',
	},
	button2: {
		fontFamily: typographyFontFamily,
		fontWeight: 700,
		lineHeight: '90%',
		...startonDarkTheme.fontSizes.sm,
		letterSpacing: '0px',
		textTransform: 'uppercase',
		textDecoration: 'none',
	},
	menu: {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 600,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.xl,
		letterSpacing: '0.5px',
		textTransform: 'uppercase',
		textDecoration: 'none',
	},
	'table-colHeader': {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 600,
		lineHeight: '140%',
		...startonDarkTheme.fontSizes.xl,
		letterSpacing: '0.5px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	'table-sectionTitle': {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 600,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.lg,
		letterSpacing: '0.5px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	'table-rowHeader': {
		fontFamily: typographyFontFamily,
		fontWeight: 700,
		lineHeight: '140%',
		...startonDarkTheme.fontSizes.md,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'none',
	},
	'table-cell': {
		fontFamily: typographyFontFamily,
		fontWeight: 500,
		lineHeight: '140%',
		...startonDarkTheme.fontSizes.md,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'none',
	},
	'table-caption': {
		fontFamily: typographyFontFamily,
		fontWeight: 400,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.xs,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'none',
	},
	'card-title': {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 600,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.xl,
		letterSpacing: '0.5px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	'card-kpi': {
		fontFamily: typographyFontTitleFamily,
		fontWeight: 700,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.xl5,
		letterSpacing: '0px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	'card-descr': {
		fontFamily: typographyFontFamily,
		fontWeight: 700,
		lineHeight: '120%',
		...startonDarkTheme.fontSizes.lg,
		letterSpacing: '0.5px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	'card-caption': {
		fontFamily: typographyFontFamily,
		fontWeight: 400,
		lineHeight: '110%',
		...startonDarkTheme.fontSizes.xs,
		letterSpacing: '0.5px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
}

export default startonDarkTheme
