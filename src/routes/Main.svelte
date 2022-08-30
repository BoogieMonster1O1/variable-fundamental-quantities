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
    let convertedQuantities: ConvertedQuantity[] = [];
    $: quantities = [Quantity.byName(firstQty), Quantity.byName(secondQty), Quantity.byName(thirdQty), Quantity.byName(fourthQty), Quantity.byName(fifthQty), Quantity.byName(sixthQty), Quantity.byName(seventhQty)];
    $: systemMatrix = new SystemMatrix(quantities);

    convertAll()

    function convertAll() {
        let mat: SystemMatrix;
        if (!systemMatrix) {
            mat = SystemMatrix.SI_QUANTITIES;
        } else if (systemMatrix.incoherant) {
            return;
        } else {
            mat = systemMatrix;
        }
        convertedQuantities = [];
        for (let quantity of Quantity.QUANTITIES) {
            convertedQuantities.push({
                name: quantity.name,
                unit: mat.getUnitString(mat.convert(quantity))
            });
        }
    }
</script>

<div class="flex flex-col font-epicfont justify-center text-center pt-4">
    <header class="fixed top-0 flex justify-center flex-col text-center w-full border-b border-gray-400 bg-white">
        <div class="text-5xl"><h1>Variable Fundamental Quantities</h1></div>
        <div class="text-2xl"><h1>Powered by Matrices ™</h1></div>
    </header>
    <br><br>
    <br><br>
    <h1>Note: The <i>units</i> of all <i>quantities</i> are those specified by the SI system of units. (metre for length, joule for energy, henry for inductance, newton for force)</h1>
    <br><br>
    <div class="flex flex-col justify-center text-center text-xl">
        <div class="flex justify-center text-center pb-2">
            <label for="firstqty">1st Fundamental Quantity:</label>
            <select id="firstqty" bind:value={firstQty}>
                {#each Quantity.QUANTITIES as qty}
                    <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                {/each}
            </select>
        </div>
        <div class="flex justify-center text-center pb-2">
            <label for="secondqty">2nd Fundamental Quantity:</label>
            <select id="secondqty" bind:value={secondQty}>
                {#each Quantity.QUANTITIES as qty}
                    <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                {/each}
            </select>
        </div>
        <div class="flex justify-center text-center pb-2">
            <label for="thirdqty">3rd Fundamental Quantity:</label>
            <select id="thirdqty" bind:value={thirdQty}>
                {#each Quantity.QUANTITIES as qty}
                    <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                {/each}
            </select>
        </div>
        <div class="flex justify-center text-center pb-2">
            <label for="fourthqty">4th Fundamental Quantity:</label>
            <select id="fourthqty" bind:value={fourthQty}>
                {#each Quantity.QUANTITIES as qty}
                    <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                {/each}
            </select>
        </div>
        <div class="flex justify-center text-center pb-2">
            <label for="fifthqty">5th Fundamental Quantity:</label>
            <select id="fifthqty" bind:value={fifthQty}>
                {#each Quantity.QUANTITIES as qty}
                    <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                {/each}
            </select>
        </div>
        <div class="flex justify-center text-center pb-2">
            <label for="sixthqty">6th Fundamental Quantity:</label>
            <select id="sixthqty" bind:value={sixthQty}>
                {#each Quantity.QUANTITIES as qty}
                    <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                {/each}
            </select>
        </div>
        <div class="flex justify-center text-center pb-2">
            <label for="seventhqty">7th Fundamental Quantity:</label>
            <select id="seventhqty" bind:value={seventhQty}>
                {#each Quantity.QUANTITIES as qty}
                    <option value={qty.name}>{qty.name} ({qty.unit}, {qty.shortUnit})</option>
                {/each}
            </select>
        </div>
    </div>
    {#if systemMatrix.incoherant}
        <div class="flex justify-center text-center text-xl">
            <div class="text-red-500">
                <h1>The system matrix is incoherent. Please select different quantities.</h1>
            </div>
        </div>
    {:else}
        <div class="flex justify-center text-center text-4xl">
            <button class="btn btn-primary" on:click={convertAll}>Convert</button>
        </div>
        <br>

        <div class="flex flex-row text-center justify-center">
            <div class="flex justify-center text-center text-xl basis-1/2">
                <table class="justify-center text-center border-separate border-spacing-2 border border-slate-500">
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
    {/if}
</div>
