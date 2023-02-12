// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from '@jest/globals'
import { result } from '../../pages'
import {
    prevSlide,
    nextSlide,
    initHiddens,
    initBoolCount,
    addTrueNext,
    addTruePrev
} from '../../pages/products/[id]'
import { defaultAddress, SetAddress } from '../helpers/setAddres'

describe('testing result', () => {
    test('normal', () => {
        expect(result(29)).toBe('object-top')
        expect(result(2)).toBe('object-left')
        expect(result(234)).toBe('object-left')
    })
    test('prevSlide', () => {
        let slide = ['hidden', 'hidden', 'block', 'hidden']
        slide = prevSlide(slide, 4)
        expect(slide).toEqual(['hidden', 'block', 'hidden', 'hidden'])
        slide = prevSlide(slide, 4)
        slide = prevSlide(slide, 4)
        expect(slide).toEqual(['hidden', 'hidden', 'hidden', 'block'])
        /* after update */
        expect(prevSlide(['block'], 4)).toEqual(['hidden', '', '', 'block'])
        expect(prevSlide(['hidden', '', '', 'block'], 4)).toEqual(['hidden', '', 'block', 'hidden'])
        expect(prevSlide(['hidden', '', 'block', 'hidden'], 4)).toEqual(['hidden', 'block', 'hidden', 'hidden'])
        expect(prevSlide(['block', 'hidden', 'hidden', 'hidden'], 4)).toEqual(['hidden', 'hidden', 'hidden', 'block'])
        expect(prevSlide(['block'], 10)).toEqual(['hidden', '', '', '', '', '', '', '', '', 'block'])
    })
    test('nextSlide', () => {
        let slide = ['hidden', 'hidden', 'block', 'hidden']
        slide = nextSlide(slide, 4)
        expect(slide).toEqual(['hidden', 'hidden', 'hidden', 'block'])
        slide = nextSlide(slide, 4)
        slide = nextSlide(slide, 4)
        expect(slide).toEqual(['hidden', 'block', 'hidden', 'hidden'])
        /* after update */
        expect(nextSlide(['block'], 4)).toEqual(['hidden', 'block', 'hidden'])
        expect(nextSlide(['hidden', 'block', 'hidden'], 4)).toEqual(['hidden', 'hidden', 'block', 'hidden'])
        expect(nextSlide(['hidden', 'hidden', 'block', 'hidden'], 4)).toEqual(['hidden', 'hidden', 'hidden', 'block'])
        expect(nextSlide(['hidden', 'hidden', 'hidden', 'block'], 4)).toEqual(['block', 'hidden', 'hidden', 'hidden'])
    })
    test('initialize array', () => {
        expect(initHiddens(0)).toEqual(['block'])
        expect(initHiddens(1)).toEqual(['block'])
        expect(initHiddens(2)).toEqual(['block', 'hidden'])
        expect(initHiddens(23)).toEqual(['block', 'hidden', 'hidden', 'hidden', 'hidden',
            'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden',
            'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'])
    })
    test('setAddress', () => {
        expect(defaultAddress).toEqual('https://dummyjson.com/products?limit=100')
        SetAddress('another url')
        expect(defaultAddress).toEqual('another url')
        SetAddress('')
        expect(defaultAddress).toEqual('another url')
    })
    test('initBoolCount', () => {
        expect(initBoolCount(2)).toEqual([true, false])
        expect(initBoolCount(3)).toEqual([true, false, false])
        expect(initBoolCount(4)).toEqual([true, false, false, false])
        expect(initBoolCount(0)).toEqual([])
    })
    test('addTrueNext', () => {
        expect(addTrueNext([true, false, false])).toEqual([true, true, false])
        expect(addTrueNext([true, true, true])).toEqual([true, true, true])
        expect(addTrueNext([true])).toEqual([true])
        expect(addTrueNext([false])).toEqual([true])
        expect(addTrueNext([])).toEqual([])
    })
    test('addTruePrev', () => {
        expect(addTruePrev([true, false, false])).toEqual([true, false, true])
        expect(addTruePrev([true, true, true])).toEqual([true, true, true])
        expect(addTruePrev([true])).toEqual([true])
        expect(addTruePrev([false])).toEqual([true])
        expect(addTruePrev([])).toEqual([])
    })
})
