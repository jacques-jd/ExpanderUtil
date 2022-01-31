//SETTINGS
// expander.target = The class name you will apply to the expander objects
// expander.trigger = The class name you will apply to the item to click on, or the "Trigger" item.
// expander.expanded = The class name for objects you want to be expanded by default (on page load)
// expander.unopened = On your trigger, you should have an indication whether the expander is open or not. This is it when it is closed
// expander.opened = This is the indication for when the expander is open.

//Note: Each trigger item is associated with the following expander item. You need to have the same amount of Triggers and expanders.

let expander = {
    target: 'expand',
    trigger: 'expandtrigger',
    expanded: 'expanded',
    opened: '\u25BE',
    unopened: '\u25B8',
    hoverable: false
};


expander.init = event => {
    //list of all expander with trigger, state, and target
    let exps = []

    for (let i = 0; i < document.querySelectorAll(`.${expander.target}`).length; i++)
    {
        if (!document.querySelectorAll(`.${expander.trigger}`)[i]) 
        {
            throw new Error(`Missing trigger for an expander.`);
        }

        exps.push({ trigger: document.querySelectorAll(`.${expander.trigger}`)[i], target: document.querySelectorAll(`.${expander.target}`)[i], open: false, hover: false });
    }

    for (let xpd of exps)
    {
        //this line adds the indicators. Modify if you want it in a different format.
        xpd.trigger.innerHTML = `${xpd.trigger.innerHTML} ${expander.unopened}`;
        xpd.trigger.style.cursor = "pointer";
        xpd.target.style.zIndex = "2";
        xpd.target.style.transformOrigin = "50% 0%";

        expander.open = xp =>
        {
            xp.target.style.display = "block";
            
            setTimeout(xp=>{
                if(!xp.hover)
                {
                    xp.target.style.transform = 'scaleY(1)';
                    xp.target.style.height = 'auto';
                }
            }, 1, xp);

            xp.trigger.innerHTML = xp.trigger.innerHTML.replace(expander.unopened, expander.opened);

            xp.open = true;
        }

        expander.close = xp =>
        {
            
            xp.target.style.transform = 'scaleY(0)';

            setTimeout(xp=>{
                if(!xp.hover)
                {
                    xp.target.style.height = '0';
                    xp.target.style.display = "none";
                }
            }, 200, xp);

            xp.trigger.innerHTML = xp.trigger.innerHTML.replace(expander.opened, expander.unopened);

            xp.open = false;
        }

        expander.delayedClose = xp =>
        {
            setTimeout(() => 
            {
                if (!xp.hover) expander.close(xp);
                else expander.delayedClose(xp);
            }, 500);
        }

        expander.toggle = xp =>
        {
            if (xp.open) expander.close(xp); else expander.open(xp);
        }

        //this line hides them and makes them 0 height by default
        if(xpd.target.classList.contains(expander.expanded)) {
            expander.open(xpd);
        } else {
            expander.close(xpd);
        }

        //prevents it from flashing when loading screen
        setTimeout(xpd => {
            xpd.target.style.transition = "transform 0.2s";
        }, 200, xpd);

        if (expander.hoverable) 
        {
            xpd.target.addEventListener("mouseleave", () => { xpd.hover = false; expander.delayedClose(xpd); });
            xpd.trigger.addEventListener("mouseleave", () => { xpd.hover = false; expander.delayedClose(xpd); });
            xpd.target.addEventListener("mouseenter", () => { xpd.hover = true; expander.open(xpd); });
            xpd.trigger.addEventListener("mouseenter", () => { xpd.hover = true; expander.open(xpd); });
        }
        else 
        {
            xpd.trigger.addEventListener("click", () => expander.toggle(xpd));
        }
    }
}
window.addEventListener("load", expander.init);