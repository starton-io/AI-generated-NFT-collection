/*
| Developed by Starton
| Filename : ElementSvg
| Author : Tibo PENDINO (tibo@starton.io)
*/

import React from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface ElementSvgProps extends SvgIconProps {}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const ElementSvg: React.FC<ElementSvgProps> = (props) => {
	return (
		<SvgIcon width="32" height="32" fill="none" {...props}>
			<g clipPath="url(#a)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M21.953 19.607V9.63l6.586-3.503v9.818l-6.586 3.663z"
					fill="url(#b)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="m17.727 23.171.07 8.43-.235.131-8.863-4.87v-3.69h9.028z"
					fill="url(#c)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M21.954 24.349v4.948l-4.392 2.435V24.35h4.392z"
					fill="url(#d)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="m13.25 17.076.004.002-.165 4.947 2.258 1.253-8.846 4.919-.13-.075-.035-9.744 9.027-5.088v2.536l-2.113 1.25z"
					fill="url(#e)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M6.505 18.373 0 14.767V9.82l6.678 3.54-.173 5.014z"
					fill="url(#f)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="m30.735 17.122-8.782 4.71v5.107l8.782-4.87v-4.947z"
					fill="url(#g)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="m2.113 15.866 4.392 2.514v9.819l-4.392-2.514v-9.819z"
					fill="#29F6A8"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M13.09 22.027v-4.948l.061-.038 8.801 4.794v5.107l-8.862-4.915z"
					fill="url(#h)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M8.866 14.644 0 9.819l8.866-4.825v9.65z"
					fill="url(#i)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="m30.737 17.122-8.781 4.87-8.866-4.918 2.28-1.269-.018.01 2.212 1.227 4.349-2.42.043-2.37 8.78 4.87z"
					fill="url(#j)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="m15.367 13.451.002-.001-.107.059-4.354-2.373L8.7 12.421V2.436l.293-.163 8.735 5.032-.058 9.73-.107.089-2.211-1.307.016-2.366z"
					fill="url(#k)"
				/>
				<path fill="url(#l)" d="M12.105 5.942h17.844v15.003H12.105z" />
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M17.565 17.093V7.305l-.096-.053 4.444-2.405.041.022v9.782l-4.39 2.442z"
					fill="url(#m)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="m15.369 13.45-8.866 4.93-4.39-2.514 8.795-4.89 4.46 2.474z"
					fill="url(#n)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M21.953 9.788V4.87l2.196-1.256 4.391 2.514-6.587 3.661z"
					fill="url(#o)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="m8.7 2.436 8.862 4.869 4.391-2.436L13.09 0 8.7 2.436z"
					fill="#76FF0B"
				/>
			</g>
			<defs>
				<linearGradient id="b" x1="25.04" y1="7.555" x2="25.431" y2="18.385" gradientUnits="userSpaceOnUse">
					<stop stopColor="#00B368" />
					<stop offset="1" stopColor="#004A4D" />
				</linearGradient>
				<linearGradient id="c" x1="8.699" y1="27.452" x2="17.799" y2="27.452" gradientUnits="userSpaceOnUse">
					<stop stopColor="#0ECD59" />
					<stop offset="1" stopColor="#16DE3E" />
				</linearGradient>
				<linearGradient id="d" x1="19.758" y1="23.724" x2="19.758" y2="31.415" gradientUnits="userSpaceOnUse">
					<stop stopColor="#003A4A" />
					<stop offset="1" stopColor="#007649" />
				</linearGradient>
				<linearGradient id="e" x1="17.927" y1="19.817" x2="9.819" y2="20.97" gradientUnits="userSpaceOnUse">
					<stop stopColor="#00AE85" />
					<stop offset=".994" stopColor="#007258" />
				</linearGradient>
				<linearGradient id="f" x1="3.297" y1="11.582" x2="3.394" y2="17.756" gradientUnits="userSpaceOnUse">
					<stop stopColor="#12C951" />
					<stop offset="1" stopColor="#009256" />
				</linearGradient>
				<linearGradient id="g" x1="21.952" y1="22.032" x2="30.734" y2="22.032" gradientUnits="userSpaceOnUse">
					<stop stopColor="#005255" />
					<stop offset="1" stopColor="#008147" />
				</linearGradient>
				<linearGradient id="h" x1="18.255" y1="18.256" x2="17.189" y2="24.105" gradientUnits="userSpaceOnUse">
					<stop stopColor="#44E28D" />
					<stop offset="1" stopColor="#10E2AA" />
				</linearGradient>
				<linearGradient id="i" x1="0" y1="9.818" x2="8.865" y2="9.818" gradientUnits="userSpaceOnUse">
					<stop stopColor="#91FF3C" />
					<stop offset="1" stopColor="#64F562" />
				</linearGradient>
				<linearGradient id="j" x1="13.088" y1="17.123" x2="30.736" y2="17.123" gradientUnits="userSpaceOnUse">
					<stop stopColor="#91FF3C" />
					<stop offset="1" stopColor="#0DE2AC" />
				</linearGradient>
				<linearGradient id="k" x1="13.16" y1="4.778" x2="13.259" y2="14.651" gradientUnits="userSpaceOnUse">
					<stop stopColor="#03E168" />
					<stop offset="1" stopColor="#05C35E" />
				</linearGradient>
				<linearGradient id="m" x1="17.877" y1="6.889" x2="20.854" y2="13.823" gradientUnits="userSpaceOnUse">
					<stop stopColor="#00837B" />
					<stop offset="1" stopColor="#03824D" />
				</linearGradient>
				<linearGradient id="n" x1="4.373" y1="17.201" x2="12.489" y2="12.137" gradientUnits="userSpaceOnUse">
					<stop stopColor="#91FF3C" />
					<stop offset="1" stopColor="#52F171" />
				</linearGradient>
				<linearGradient id="o" x1="21.799" y1="8.078" x2="25.88" y2="4.804" gradientUnits="userSpaceOnUse">
					<stop stopColor="#11E2AA" />
					<stop offset=".638" stopColor="#8DFE40" />
				</linearGradient>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h30.857v32H0z" />
				</clipPath>
				<pattern id="l" patternContentUnits="objectBoundingBox" width="1" height="1"></pattern>
				{/*<image id="p" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABeCAYAAADG1PFrAAAACXBIWXMAAAsSAAALEgHS3X78AAAA"/>*/}
			</defs>
		</SvgIcon>
	)
}
