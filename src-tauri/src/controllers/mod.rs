use crate::types::{Channel, Contacts, Peer};

#[tauri::command]
pub async fn get_contacts() -> Contacts {
    // TODO: remove demo data
    let result = Contacts {
        channels: vec![Channel {
            id: String::from("channel id"),
            name: String::from("channel name"),
        }],
        directs: vec![Peer {
            id: String::from("direct id"),
            name: String::from("direct name"),
            avatar: String::from(""),
        }],
    };

    result.into()
}
