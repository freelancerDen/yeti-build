const options = {
    home: '/',
    limmiter: 'limmiter',
    history: 'history',
    statistic: 'statistic',
    runner: 'runner' 
};

window.addEventListener('load', () => {
    const getMetaName = document.querySelectorAll('meta');
    const activeClass = 'active-link';
    const navMenu = document.querySelector('.nav-menu').querySelectorAll('a');
    
    let val = null;
    getMetaName.forEach(item => {
        for (string in options) {
            if (item.name === string) {
            val = string;
            }
        }
    });
    
    const checkName = (value) => {
        navMenu.forEach(item => {
            item.classList.remove(activeClass);
            if (item.name === value) {
                item.classList.add(activeClass);
            }
        })    
    }
    checkName(val);

})

