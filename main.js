const config = {
    "url": "https://api.recursionist.io/builder/computers?type=",  
};

// CPUの情報をAPIから取得
const getCpuInfo = () => fetch(config.url + "cpu").then(response => response.json());

// GPUの情報をAPIから取得
const getGpuInfo = () => fetch(config.url + "gpu").then(response => response.json());

// Step1 : Select Your CPU
// CPUのBrandを選択可能にする
getCpuInfo().then(data => {
    // 重複を排除
    const brands = Array.from(new Set(
        data.map((obj) => { return obj.Brand; })
    ));

    const cpuBrand = document.getElementById("cpu-brand");
    // optionに追加
    for (const value of brands) {
        cpuBrand.innerHTML += `
            <option value="${value}">${value}</option>
        `;
    }
});

// CPUのBrandを選択すると、Modelの選択を可能にする
document.getElementById("cpu-brand").addEventListener("change", () => {
    const brand = document.getElementById("cpu-brand").value;

    getCpuInfo().then(data => {
        const models = data.filter(obj => { return obj.Brand === brand; });

        const cpuModel = document.getElementById("cpu-model");
        // optionに追加
        cpuModel.innerHTML = "";
        for (const value of models) {
            cpuModel.innerHTML += `
                <option value="${value.Model}">${value.Model}</option>
            `;
        }
    });
});

// Step2 : Select Your GPU
// GPUのBrandを選択可能にする
getGpuInfo().then(data => {
    // 重複を排除
    const brands = Array.from(new Set(
        data.map((obj) => { return obj.Brand; })
    ));
    document.getElementById("storage-model").value = data.length;

    const gpuBrand = document.getElementById("gpu-brand");
    // optionに追加
    for (const value of brands) {
        gpuBrand.innerHTML += `
            <option value="${value}">${value}</option>
        `;
    }
});

// GPUのBrandを選択すると、Modelの選択を可能にする
document.getElementById("gpu-brand").addEventListener("change", () => {
    const brand = document.getElementById("gpu-brand").value;

    getGpuInfo().then(data => {
        const models = data.filter(obj => { return obj.Brand === brand; });

        const gpuModel = document.getElementById("gpu-model");
        // optionに追加
        gpuModel.innerHTML = "";
        for (const value of models) {
            gpuModel.innerHTML += `
                <option value="${value.Model}">${value.Model}</option>
            `;
        }
    });
});

// Step3 : Select Your Memory Card
document.querySelectorAll(".add-btn")[0].addEventListener("click", () => {
    fetch(config.url + "gpu")
    .then(response => response.json())
    .then(data => {
        document.getElementById("storage-model").value = "click";
    })
});
