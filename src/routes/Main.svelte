<script lang="ts">
    import {Quantity} from "../lib/Quantity.js";
    import {SystemMatrix} from "../lib/SystemMatrix";
    Quantity.QUANTITIES.sort((a, b) => a.name.localeCompare(b.name));

    interface ConvertedQuantity {
        name: string;
        unit: string;
    }

    let firstQty = Quantity.TIME.name,
        secondQty = Quantity.LENGTH.name,
        thirdQty = Quantity.MASS.name,
        fourthQty = Quantity.CURRENT.name,
        fifthQty = Quantity.TEMPERATURE.name,
        sixthQty = Quantity.LUMINOUS_INTENSITY.name,
        seventhQty = Quantity.AMOUNT_OF_SUBSTANCE.name;

    function reset() {
        firstQty = Quantity.TIME.name;
        secondQty = Quantity.LENGTH.name;
        thirdQty = Quantity.MASS.name;
        fourthQty = Quantity.CURRENT.name;
        fifthQty = Quantity.TEMPERATURE.name;
        sixthQty = Quantity.LUMINOUS_INTENSITY.name;
        seventhQty = Quantity.AMOUNT_OF_SUBSTANCE.name;
    }

    let convertedQuantities: ConvertedQuantity[] = [];
    $: quantities = [Quantity.byName(firstQty), Quantity.byName(secondQty), Quantity.byName(thirdQty), Quantity.byName(fourthQty), Quantity.byName(fifthQty), Quantity.byName(sixthQty), Quantity.byName(seventhQty)];
    $: systemMatrix = convertAll(quantities);

    function convertAll(qtys: Quantity[]): SystemMatrix {
        let mat: SystemMatrix = new SystemMatrix(qtys);
        if (mat.incoherant) {
            return mat;
        }
        convertedQuantities = [];
        for (let quantity of Quantity.QUANTITIES) {
            convertedQuantities.push({
                name: quantity.name,
                unit: mat.getUnitString(mat.convert(quantity))
            });
        }
        return mat;
    }
</script>

<div class="flex flex-col font-epicfont justify-center text-center pt-4 max-h-screen h-screen">
    <header class="pt-5 flex justify-center flex-col text-center w-full border-b border-gray-400 bg-white">
        <div class="text-5xl"><h1>Variable Fundamental Quantities</h1></div>
        <div class="text-2xl pt-2"><h1>Powered by Matrices ™</h1></div>
    </header>
    <br>
    <br>
    <div class="flex flex-row text-center justify-center">
        <div class="flex flex-col justify-center text-center basis-3/5 items-start h-max w-max">
            <h1>Note: The <i>units</i> of all <i>quantities</i> are those specified by the SI system of units. (metre for length, joule for energy, henry for inductance, newton for force)</h1>
            <br><br>
            <div class="flex flex-col justify-center text-center text-xl">
                <div class="flex justify-center text-center pb-2">
                    <label for="firstqty">1st Fundamental Quantity: </label>
                    <select id="firstqty" bind:value={firstQty}>
                        {#each Quantity.QUANTITIES as qty}
                            <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                        {/each}
                    </select>
                </div>
                <div class="flex justify-center text-center pb-2">
                    <label for="secondqty">2nd Fundamental Quantity: </label>
                    <select id="secondqty" bind:value={secondQty}>
                        {#each Quantity.QUANTITIES as qty}
                            <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                        {/each}
                    </select>
                </div>
                <div class="flex justify-center text-center pb-2">
                    <label for="thirdqty">3rd Fundamental Quantity: </label>
                    <select id="thirdqty" bind:value={thirdQty}>
                        {#each Quantity.QUANTITIES as qty}
                            <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                        {/each}
                    </select>
                </div>
                <div class="flex justify-center text-center pb-2">
                    <label for="fourthqty">4th Fundamental Quantity: </label>
                    <select id="fourthqty" bind:value={fourthQty}>
                        {#each Quantity.QUANTITIES as qty}
                            <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                        {/each}
                    </select>
                </div>
                <div class="flex justify-center text-center pb-2">
                    <label for="fifthqty">5th Fundamental Quantity: </label>
                    <select id="fifthqty" bind:value={fifthQty}>
                        {#each Quantity.QUANTITIES as qty}
                            <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                        {/each}
                    </select>
                </div>
                <div class="flex justify-center text-center pb-2">
                    <label for="sixthqty">6th Fundamental Quantity: </label>
                    <select id="sixthqty" bind:value={sixthQty}>
                        {#each Quantity.QUANTITIES as qty}
                            <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                        {/each}
                    </select>
                </div>
                <div class="flex justify-center text-center pb-2">
                    <label for="seventhqty">7th Fundamental Quantity: </label>
                    <select id="seventhqty" bind:value={seventhQty}>
                        {#each Quantity.QUANTITIES as qty}
                            <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                        {/each}
                    </select>
                </div>
            </div>

            <br>
            <div class="flex justify-center text-center text-2xl">
                <button class="transition duration-500 ease-in-out bg-blue-500 hover:bg-red-700 text-white py-2 px-4 rounded" on:click={() => {
                    reset();
                }}>
                    Reset to Default
                </button>
            </div>
            <br>
            <div class="flex justify-center text-center text-2xl text-blue-500 underline w-max">
                <a href="https://github.com/BoogieMonster1O1/variable-fundamental-quantities.git">View epic code</a>
            </div>
        </div>

        <div class="flex flex-col text-center justify-center p-5">
            {#if systemMatrix.incoherant}
                <div class="flex justify-center text-center text-xl">
                    <div class="text-red-500">
                        <h1>The system is incoherent.<br>Please select different quantities.</h1>
                    </div>
                </div>
                <br>
            {/if}
            <div class="flex justify-center text-center text-sm basis-4/5 overflow-y-scroll flex-grow">
                <table class="justify-center text-center border-separate border-spacing-1 border border-slate-500">
                    <thead>
                    <tr>
                        <th class="text-center border border-slate-600">Quantity</th>
                        <th class="text-center border border-slate-600">Unit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each convertedQuantities as convertedQuantity}
                        <tr>
                            <td class="text-left border border-slate-600">{convertedQuantity.name}</td>
                            <td class="text-left border border-slate-600 pr-2 pl-2" >{convertedQuantity.unit}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
