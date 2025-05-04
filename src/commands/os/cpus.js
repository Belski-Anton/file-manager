import os from "os";

export const cpusInfo = () => {
  const cpus = os.cpus();

  console.log(`Overall CPUs: ${cpus.length}\n`);


  const tableData = cpus.map((cpu, index) => ({
    cpu: `CPU ${index}`,
    model: cpu.model,
    speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
  }));


  console.table(tableData);
};