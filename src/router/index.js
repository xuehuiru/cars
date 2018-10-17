import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/index'

import Detail from '../views/detail'

import Img from '../views/img'

import Quotation from '../views/quotation'

import City from '../views/city'

import Color from '../views/color'

import Car from '../views/car'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/img',
      name: 'Img',
      component: Img
    },
    {
      path: '/quotation',
      name: 'quotation',
      component: Quotation
    },
    {
      path: '/color',
      name: 'color',
      component: Color
    },
    {
      path: '/car',
      name: 'car',
      component: Car
    }
  ]
})
