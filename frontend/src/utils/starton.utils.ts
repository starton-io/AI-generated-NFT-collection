/*
| Developed by Starton
| Filename : starton.utils.ts
*/

import { Dictionary } from 'utils/types'

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface IFilters {
	// eslint-disable-next-line no-unused-vars
	[key: string]: (value: any) => boolean
}

/*
|--------------------------------------------------------------------------
| Utils
|--------------------------------------------------------------------------
*/
class StartonUtils {
	/*
	|--------------------------------------------------------------------------
	| URL Helpers
	|--------------------------------------------------------------------------
	*/
	static getURL(): string {
		const url =
			process?.env?.HOST && process.env.HOST !== ''
				? process.env.HOST
				: process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
				? process.env.VERCEL_URL
				: 'http://localhost:3000'

		return url.includes('http') ? url : `https://${url}`
	}

	/*
	|--------------------------------------------------------------------------
	| MATHS
	|--------------------------------------------------------------------------
	*/
	// tpmt is two power minus ten times t scaled to [0,1]
	static tpmt(x: number) {
		return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494
	}

	/*
	|--------------------------------------------------------------------------
	| EASE
	|--------------------------------------------------------------------------
	*/

	// Bounce
	// ----------------------------------------------------------------------------
	private static bounce1 = 4 / 11
	private static bounce2 = 6 / 11
	private static bounce3 = 8 / 11
	private static bounce4 = 3 / 4
	private static bounce5 = 9 / 11
	private static bounce6 = 10 / 11
	private static bounce7 = 15 / 16
	private static bounce8 = 21 / 22
	private static bounce9 = 63 / 64
	private static bounce0 = 1 / (4 / 11) / (4 / 11)

	static bounceOut(t: number) {
		return (t = +t) < this.bounce1
			? this.bounce0 * t * t
			: t < this.bounce3
			? this.bounce0 * (t -= this.bounce2) * t + this.bounce4
			: t < this.bounce6
			? this.bounce0 * (t -= this.bounce5) * t + this.bounce7
			: this.bounce0 * (t -= this.bounce8) * t + this.bounce9
	}

	static bounceInOut(t: number) {
		return ((t *= 2) <= 1 ? 1 - this.bounceOut(1 - t) : this.bounceOut(t - 1) + 1) / 2
	}

	static bounceIn(t: number) {
		return 1 - this.bounceOut(1 - t)
	}

	// Circle
	// ----------------------------------------------------------------------------
	static circleIn(t: number) {
		return 1 - Math.sqrt(1 - t * t)
	}

	static circleOut(t: number) {
		return Math.sqrt(1 - --t * t)
	}

	static circleInOut(t: number) {
		return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2
	}

	// Cubic
	// ----------------------------------------------------------------------------
	static cubicIn(t: number) {
		return t * t * t
	}

	static cubicOut(t: number) {
		return --t * t * t + 1
	}

	static cubicInOut(t: number) {
		return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
	}

	// Exp
	// ----------------------------------------------------------------------------
	static expIn(t: number) {
		return this.tpmt(1 - +t)
	}

	static expOut(t: number) {
		return 1 - this.tpmt(t)
	}

	static expInOut(t: number) {
		return ((t *= 2) <= 1 ? this.tpmt(1 - t) : 2 - this.tpmt(t - 1)) / 2
	}

	// Linear
	// ----------------------------------------------------------------------------
	static linear = (t: number) => +t

	// Quad
	// ----------------------------------------------------------------------------
	static quadIn(t: number) {
		return t * t
	}

	static quadOut(t: number) {
		return t * (2 - t)
	}

	static quadInOut(t: number) {
		return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2
	}

	// Sin
	// ----------------------------------------------------------------------------
	private static pi = Math.PI
	private static halfPi = StartonUtils.pi / 2

	static sinIn(t: number) {
		return +t === 1 ? 1 : 1 - Math.cos(t * this.halfPi)
	}

	static sinOut(t: number) {
		return Math.sin(t * this.halfPi)
	}

	static sinInOut(t: number) {
		return (1 - Math.cos(this.pi * t)) / 2
	}

	// Array
	// ----------------------------------------------------------------------------
	private static getValue(value: any) {
		return typeof value === 'string' ? value.toUpperCase() : value
	}

	static filterArray<TInput = any>(array: Array<TInput>, filters: IFilters): Array<TInput> {
		const filterKeys = Object.keys(filters)
		return array.filter((item) => {
			// validates all filter criteria
			return filterKeys.every((key) => {
				// ignores non-function predicates
				if (typeof filters[key] !== 'function') return true
				// @ts-ignore
				return filters[key](item[key])
			})
		})
	}

	static filterPlainArray<TInput = any, TArray = any>(
		array: Array<TInput>,
		filters: Dictionary<Array<TArray>>,
	): Array<TInput> {
		const filterKeys = Object.keys(filters)
		return array.filter((item) => {
			// validates all filter criteria
			return filterKeys.every((key) => {
				// ignores an empty filter
				if (!filters[key].length) return true
				// @ts-ignore
				return filters[key].find((filter) => this.getValue(filter) === this.getValue(item[key]))
			})
		})
	}
}

export default StartonUtils
