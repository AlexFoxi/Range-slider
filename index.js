const priceSlider = () => {
	const createSlider = slider => {
		const rangeInputs = slider.querySelectorAll('.start-wrapper input')
		const thumbLeft = slider.querySelector('.thumb.left')
		const thumbRight = slider.querySelector('.thumb.right')
		const rangeBetween = slider.querySelector('.range-between')
		const minValue = slider.querySelector('.range-value-min')
		const maxValue = slider.querySelector('.range-value-max')

		const [minValueThumb, maxValueThumb] = rangeInputs
		let safeRange = Number(minValueThumb.getAttribute('safeRange'))
		const maxRangeValue = Number(maxValueThumb.getAttribute('max'))
		const minRangeValue = Number(maxValueThumb.getAttribute('min'))
		safeRange = closeSafeRange(safeRange, slider, maxRangeValue)

		minValue.value = minValueThumb.value
		maxValue.value = maxValueThumb.value

		slider.addEventListener('input', e => {
			inputValidation(e.target)

			inputLimits(
				e.target,
				minValue,
				maxValue,
				safeRange,
				minRangeValue,
				maxRangeValue
			)
			sliderLimits(
				e.target,
				minValueThumb,
				maxValueThumb,
				safeRange,
				minValue,
				maxValue
			)

			bindInput(e.target, minValueThumb, maxValueThumb, minValue, maxValue)

			setStartValueSlider(minValueThumb, thumbLeft, rangeBetween)
			setEndValueSlider(maxValueThumb, thumbRight, rangeBetween)

			lastThumbTop(
				e.target,
				minValueThumb,
				maxValueThumb,
				thumbLeft,
				thumbRight
			)
		})
	}

	const closeSafeRange = (safeRange, slider, maxRangeValue) => {
		if (!safeRange) {
			const sliderWidth = slider.offsetWidth
			const thumbWidth = slider.querySelector('.thumb.left').offsetWidth
			return Number(
				((((thumbWidth * 100) / sliderWidth) * maxRangeValue) / 100).toFixed(0)
			)
		}
	}

	const inputValidation = target => {
		let value = Number(target.value)
		target.value = value = isNanEl(target.value)
	}

	const isNanEl = item =>
		item
			.split('')
			.filter(el => !isNaN(el))
			.join('')

	const bindInput = (
		target,
		minValueThumb,
		maxValueThumb,
		minValue,
		maxValue
	) => {
		target == minValue ? (minValueThumb.value = target.value) : false
		target == maxValue ? (maxValueThumb.value = target.value) : false
		target == minValueThumb ? (minValue.value = target.value) : false
		target == maxValueThumb ? (maxValue.value = target.value) : false
	}

	const inputLimits = (
		target,
		minValue,
		maxValue,
		safeRange,
		minRangeValue,
		maxRangeValue
	) => {
		if (target.value.length < 1) target.value = minRangeValue
		if (target == minValue) {
			Number(target.value) >= Number(maxValue.value)
				? (target.value = Number(maxValue.value) - safeRange)
				: false
		}
		if (target == maxValue) {
			if (Number(target.value) <= Number(minValue.value) + safeRange)
				target.value = Number(minValue.value) + safeRange
			if (Number(target.value) > Number(maxRangeValue))
				target.value = maxRangeValue
		}
	}

	const sliderLimits = (
		target,
		minValueThumb,
		maxValueThumb,
		safeRange,
		minValue,
		maxValue
	) => {
		const newMaxRangeValue = Number(maxValueThumb.value) - safeRange
		const newMinValue = Number(minValueThumb.value) + safeRange

		if (
			target == maxValueThumb &&
			Number(target.value) <= Number(minValueThumb.value)
		) {
			maxValueThumb.value = newMinValue
			maxValue.value = newMinValue
		}

		if (
			target == minValueThumb &&
			Number(target.value) >= Number(maxValueThumb.value)
		) {
			minValueThumb.value = newMaxRangeValue
			minValue.value = newMaxRangeValue
		}
	}

	const setStartValueSlider = (minValueThumb, thumb, range) => {
		const percent =
			((Number(minValueThumb.value) - minValueThumb.min) /
				(minValueThumb.max - minValueThumb.min)) *
			100
		thumb.style.left = percent + '%'
		range.style.left = percent + '%'
	}

	const setEndValueSlider = (maxValueThumb, thumb, range) => {
		const percent =
			((Number(maxValueThumb.value) - maxValueThumb.min) /
				(maxValueThumb.max - maxValueThumb.min)) *
			100
		thumb.style.right = 100 - percent + '%'
		range.style.right = 100 - percent + '%'
	}

	const lastThumbTop = (
		target,
		minValueThumb,
		maxValueThumb,
		thumbLeft,
		thumbRight
	) => {
		thumbLeft.style.zIndex = '3'
		thumbRight.style.zIndex = '3'
		if (target == minValueThumb) {
			thumbLeft.style.zIndex = '4'
		}
		if (target == maxValueThumb) {
			thumbRight.style.zIndex = '4'
		}
	}

	const rangeSliders = document.querySelectorAll('.range-slider.extra')
	if (rangeSliders)
		rangeSliders.forEach(rangeSlider => createSlider(rangeSlider))
}

//Init functions
document.addEventListener('DOMContentLoaded', () => {
	priceSlider()
})
