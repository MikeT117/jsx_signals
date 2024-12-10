import { logger } from "./logger";

const SignalContext = {
    currentlyComputing: [],
};

function pushToCurrentlyComputing(computation) {
    logger("PUSHING TO STACK", 1, { computation });
    SignalContext.currentlyComputing.push(computation);
}

function popFromCurrentlyComputing() {
    logger("POPPING FROM STACK", 1);
    SignalContext.currentlyComputing.pop();
}

class Signal {
    constructor(initialValue) {
        this.value = initialValue;
        this.listeners = new Set();
    }

    addListener(listener) {
        logger("ADDING LISTENER (SIGNAL)", 1, { listener });
        this.listeners.add(listener);
    }

    get() {
        logger("GETTING SIGNAL", 1);
        if (SignalContext.currentlyComputing.length !== 0) {
            this.addListener(
                SignalContext.currentlyComputing[
                    SignalContext.currentlyComputing.length - 1
                ]
            );
        }
        return this.value;
    }

    set(inputValue) {
        logger("SETTING SIGNAL", 1, { inputValue });
        let resolvedValue =
            typeof inputValue === "function"
                ? inputValue(this.value)
                : inputValue;

        if (this.value !== resolvedValue) {
            this.value = resolvedValue;
            this.listeners.forEach((listener) => listener.update());
        }
    }
}

class Computed {
    constructor(computation) {
        if (typeof computation !== "function") {
            throw new Error("Computed expects a function");
        }
        this.listeners = new Set();
        this.computation = computation;
    }

    addListener(listener) {
        logger("ADDING LISTENER (COMPUTED)", 1, { listener });
        this.listeners.add(listener);
    }

    get() {
        logger("GETTING COMPUTATION", 1);
        pushToCurrentlyComputing(this);
        this.computation();
        popFromCurrentlyComputing();
    }

    update() {
        logger("RE-RUNNING COMPUTATION", 1);
        this.computation();
    }
}

export function createSignal(value) {
    const s = new Signal(value);
    return [s.get.bind(s), s.set.bind(s)];
}

export function createEffect(effectFn) {
    if (typeof effectFn !== "function") {
        throw new Error("createEffect expects a function");
    }
    const computed = new Computed(effectFn);
    computed.get();
}
