#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]

pub fn add<'a>(x: &'a f64, y: &'a f64) -> f64 {
    x + y
}

pub fn sub<'a>(x: &'a f64, y: &'a f64) -> f64 {
    x - y
}

pub fn mul<'a>(x: &'a f64, y: &'a f64) -> f64 {
    x * y
}

pub fn div<'a>(x: &'a f64, y: &'a f64) -> f64 {
    x / y
}
