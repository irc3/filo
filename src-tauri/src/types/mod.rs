#[derive(serde::Serialize)]
pub struct Channel {
    pub id: String,
    pub name: String,
}

#[derive(serde::Serialize)]
pub struct Peer {
    pub id: String,
    pub name: String,
    pub avatar: String,
}

#[derive(serde::Serialize)]
pub struct Contacts {
    pub channels: Vec<Channel>,
    pub directs: Vec<Peer>,
}
