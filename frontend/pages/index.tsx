import { useCallback, useState } from "react";
import type { wifiProfile } from "../@types";

export default function Index() {
  const [count, setCount] = useState(0);
  const [tdata, setTdata] = useState<wifiProfile[]>([]);

  const mainFunc = useCallback(async () => {
    const response: {
      error: boolean;
      stdout: string;
      stderr: string;
      path: string;
      message?: string;
      data: wifiProfile[];
    } = await global.api.runCommand(`netsh wlan export profile key=clear`);

    if (!response.error) {
      // quantidade de redes encontradas
      const count = response.data?.length;
      setCount(count);

      setTdata(response.data);
    } else {
      alert(`Erro ao execultar comando \n${response.message}`);
    }
  }, []);

  return (
    <main className="flex flex-col p-1">
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded m-1"
        onClick={mainFunc}
      >
        Sincronizar
      </button>

      <div className="p-2 border border-red-100 rounded-md">
        <table className="w-full border-collapse">
          <caption className="caption-top">
            <h3>
              Total: {count} rede{count > 1 && "s"} encontrada{count > 1 && "s"}
            </h3>
          </caption>
          <thead>
            <tr className="text-left bg-gray-500 text-white font-bold">
              <th className="border border-slate-600 p-1">SSID</th>
              <th className="border border-slate-600 p-1">Auth Type</th>
              <th className="border border-slate-600 p-1">Encryption</th>
              <th className="border border-slate-600 p-1">Password</th>
            </tr>
          </thead>

          <tbody>
            {tdata.map(({ WLANProfile: profile }) => (
              <tr>
                <td className="border border-slate-600 font-bold">
                  {profile.SSIDConfig.SSID.name}
                </td>
                <td className="border border-slate-600">
                  {profile.MSM.security.authEncryption.authentication}
                </td>
                <td className="border border-slate-600">
                  {profile.MSM.security.authEncryption.encryption}
                </td>
                <td className="border border-slate-600">
                  {profile.MSM.security.sharedKey?.keyMaterial}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
