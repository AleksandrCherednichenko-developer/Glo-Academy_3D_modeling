'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import image from './modules/image';
import input from './modules/input';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Таймер
countTimer('13 sept 2021');
// Меню
toggleMenu();
// Попап
togglePopUp();
// Табы
tabs();
// Слайдер
slider();
// Наведение на иконки команды
image();
// Валидация
input();
// Калькулятор
calc(100);
// Отправка формы
sendForm();
