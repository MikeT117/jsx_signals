import { createEffect, createSignal } from "../runtime/signal-runtime";
import { Button } from "./Button";

export function App() {
    const [count, setCount] = createSignal(0);
    const derivedMultipliedCount = () => count() * 2;

    createEffect(() => {
        console.log({
            count: count(),
            derivedMultipliedCount: derivedMultipliedCount(),
        });
    });

    function handleClick() {
        setCount((val) => (val += 1));
    }

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="flex flex-col">
                <h1 className="mb-4 text-xl font-bold">Prototype</h1>
                <div className="mb-2 space-y-2">
                    <h2 className="mb-2 font-medium">Base Reactivity</h2>
                    <div>
                        <p className="font-medium">Signal - Count: {count}</p>
                        <p className="font-medium">
                            Derived - Count: {derivedMultipliedCount}
                        </p>
                    </div>
                    <Button onClick={handleClick}>Increment Count</Button>
                </div>
            </div>
        </div>
    );
}
