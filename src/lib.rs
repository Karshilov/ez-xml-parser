mod utils;

use serde::{Deserialize, Serialize};
use strong_xml::{XmlRead, XmlWrite};
use wasm_bindgen::prelude::*;
use utils::set_panic_hook;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, ez-xml-parser!");
}

#[derive(XmlWrite, XmlRead, PartialEq, Debug, Serialize, Deserialize)]
#[xml(tag = "image")]
pub struct Image {
    #[xml(attr = "src")]
    src: String,
    #[xml(attr = "id")]
    id: Option<String>,
    #[xml(attr = "class")]
    class: Option<String>,
}

#[derive(XmlWrite, XmlRead, PartialEq, Debug, Serialize, Deserialize)]
#[xml(tag = "text")]
pub struct Text {
    #[xml(attr = "value")]
    value: String,
    #[xml(attr = "id")]
    id: Option<String>,
    #[xml(attr = "class")]
    class: Option<String>,
}

#[derive(XmlWrite, XmlRead, PartialEq, Debug, Serialize, Deserialize)]
enum Tag {
    #[xml(tag = "image")]
    Image(Image),
    #[xml(tag = "text")]
    Text(Text),
    #[xml(tag = "view")]
    View(View),
}

#[derive(XmlWrite, XmlRead, PartialEq, Debug, Serialize, Deserialize)]
#[xml(tag = "view")]
pub struct View {
    #[xml(attr = "id")]
    id: String,
    #[xml(attr = "class")]
    class: Option<String>,
    #[xml(child = "view", child = "image", child = "text")]
    children: Vec<Tag>,
}

#[wasm_bindgen]
pub fn template(raw: &str) -> JsValue {
    match View::from_str(raw) {
        Ok(value) => {
            set_panic_hook();
            return JsValue::from_serde(&value).unwrap();
        }
        Err(e) => {
            alert(&format!("{}", e).to_string());
            return JsValue::from_serde(&View {
                id: String::from(""),
                children: Vec::new(),
                class: None,
            })
            .unwrap();
        }
    }
}
