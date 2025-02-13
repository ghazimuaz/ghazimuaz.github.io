const cursor = new MouseFollower();
const profile = document.getElementById('title');
const downloadBtn = document.getElementById('download-btn');
const HireBtn = document.getElementById('hire-btn');

profile.addEventListener('mouseenter', () => {
    cursor.setImg('./assets/img/profile.png')
});

profile.addEventListener('mouseleave', () => {
    cursor.removeImg()
});

// downloadBtn.addEventListener('mouseenter', () => {
//     cursor.setState('.-lg')
// });