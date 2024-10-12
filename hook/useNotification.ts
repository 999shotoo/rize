const requestNotificationPermission = async () => {
    if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            console.log("Notification permission granted.");
        } else {
            console.log("Notification permission denied.");
        }
    }
};

const showNotification = (song: any) => {
    if (Notification.permission === "granted") {
        const notification = new Notification(song.name, {
            body: `Now playing: ${song.artists.primary[0].name}`,
            icon: song.image.find((image: any) => image.quality === "500x500")?.url || "/placeholder.svg",
        });

        notification.onclick = () => {
            // Handle click event
            window.focus(); // Bring the window to focus
        };
    }
};