#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{AboutMetadata, Manager, Menu, MenuItem, Submenu, SystemTray, SystemTrayEvent};

mod controllers;
mod types;

use controllers::get_contacts;

fn build_menu() -> Menu {
    let app_name = "Filo";
    let mut menu = Menu::new();

    // App
    #[cfg(target_os = "macos")]
    {
        menu = menu.add_submenu(Submenu::new(
            app_name,
            Menu::new()
                .add_native_item(MenuItem::About(app_name.to_string(), AboutMetadata::new()))
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Services)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Hide)
                .add_native_item(MenuItem::HideOthers)
                .add_native_item(MenuItem::ShowAll)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Quit),
        ));
    }

    // File
    menu = menu.add_submenu(Submenu::new(
        "File",
        if cfg!(target_os = "macos") {
            Menu::new().add_native_item(MenuItem::CloseWindow)
        } else {
            Menu::new().add_native_item(MenuItem::Quit)
        },
    ));

    // Edit
    menu = menu.add_submenu(Submenu::new("Edit", {
        let mut menu = Menu::new();
        menu = menu.add_native_item(MenuItem::Undo);
        menu = menu.add_native_item(MenuItem::Redo);
        menu = menu.add_native_item(MenuItem::Separator);
        menu = menu.add_native_item(MenuItem::Cut);
        menu = menu.add_native_item(MenuItem::Copy);
        menu = menu.add_native_item(MenuItem::Paste);
        #[cfg(not(target_os = "macos"))]
        {
            menu = menu.add_native_item(MenuItem::Separator);
        }
        menu = menu.add_native_item(MenuItem::SelectAll);
        menu
    }));

    // View
    menu = menu.add_submenu(Submenu::new(
        "View",
        Menu::new().add_native_item(MenuItem::EnterFullScreen),
    ));

    // Window
    menu = menu.add_submenu(Submenu::new("Window", {
        let mut menu = Menu::new()
            .add_native_item(MenuItem::Minimize)
            .add_native_item(MenuItem::Zoom);
        if cfg!(target_os = "macos") {
            menu = menu.add_native_item(MenuItem::Separator);
            // not yet supported:
            // menu.add_native_item(MenuItem::BringAllToFront);
            // not yet supported (window selector):
            // menu.add_native_item(MenuItem::Window);
        } else {
            menu = menu.add_native_item(MenuItem::CloseWindow);
        }

        // Help
        menu = menu.add_submenu(Submenu::new(
            "Help",
            Menu::new(), // should open url when clicked:
                         // .add_item(MenuItem::Url("Learn More", url)),
        ));

        menu
    }));

    menu
}

fn main() {
    let menu = build_menu();
    let system_tray = SystemTray::new();
    tauri::Builder::default()
        .menu(menu)
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                _ => {}
            },
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![get_contacts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
