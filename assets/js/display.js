function display(element, counter)
{
    console.log(counter + " [==>")
    console.log(element.localName,element.className,element.id)
    console.log(element);
    for(let child of element.children)
    {
        display(child,counter+1);
    }
    console.log(element.localName,element.className,element.id)
    console.log("<==] " + counter)
}

display(document.body,0);