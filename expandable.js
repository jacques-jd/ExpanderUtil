
//SETTINGS
// expandableClass = The class name you will apply to the expandable objects
// triggerClass = The class name you will apply to the item to click on, or the "Trigger" item.
// unopened = On your trigger, you should have an indication whether the expandable is open or not. This is it when it is closed
// opened = This is the indication for when the expandable is open.

//Note: Each trigger item is associated with the following expandable item. You need to have the same amount of Triggers and Expandables.

let expandableClass = 'exp',
    triggerClass = 'trig',
    unopened = '⮞',
    opened = '⮟';


window.onload = event => {
    let exps = []; //list of all expandable with trigger, state, and target

    for(let i = 0; i < document.querySelectorAll(`.${expandableClass}`).length; i++)
    {
        if(!document.querySelectorAll(`.${triggerClass}`)[i]) 
        {
            throw new Error(`Missing trigger for an expandable.`);
        }
            
        exps.push({trigger: document.querySelectorAll(`.${triggerClass}`)[i], target: document.querySelectorAll(`.${expandableClass}`)[i], open: false});
    }

    for(let xp of exps)
    {
        //this line adds the indicators. Modify if you want it in a different format.
        xp.trigger.innerHTML = `${xp.trigger.innerHTML} ${unopened}`;
        xp.trigger.style.cursor = "pointer";

        //this line hides them and makes them 0 height by default
        xp.target.style.opacity = "0";
        xp.target.style.height = "0";


        //this line adds the transition. comment out if you don't want transition.
        xp.target.style.transition = "opacity 0.2s, transform 0.2s";
        
        xp.trigger.onclick = event => {
            xp.target.style.transform = xp.open ? 'scaleY(0)' : 'scaleY(1)';
            xp.target.style.height = xp.open ? '0' : 'auto';
            xp.target.style.opacity = xp.open ? '0' : '1';

            if (xp.open) xp.trigger.innerHTML = xp.trigger.innerHTML.replace(opened, unopened); 
            else xp.trigger.innerHTML = xp.trigger.innerHTML.replace(unopened, opened);

            xp.open = !xp.open;
        }
    }
}