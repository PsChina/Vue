import { watchEffect } from "./reactivity/index.js";
import { mountElement, diff } from './renderer.js';

export function creatApp(rootComponent) {
    return {
        mount(rootContainer) {
            const setupResult = rootComponent.setup();
            let isMounted = false,
                oldTree;
            watchEffect(() => {
                if (!isMounted) {
                    isMounted = true;
                    const subTree = rootComponent.render(setupResult);
                    rootContainer.innerHTML = ``;
                    mountElement(subTree, rootContainer);
                    oldTree = subTree;
                } else {
                    const newTree = rootComponent.render(setupResult);
                    diff(oldTree, newTree);
                    oldTree = newTree;
                }

            })

        }
    }
}