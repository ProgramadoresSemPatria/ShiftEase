import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useShiftExchangeRequest } from "@/hooks/useShiftExchangeRequest";
import { ScheduleShift } from "@/types/schedule";
import { useContext, useState } from "react";
import SelectExchangeShift from "./SelectExchangeShift";

type Props = {
  name: string;
  schedule: string;
  day: string;
  receptorId: string;
  destinationId?: string;
  loggedUserShifts: ScheduleShift[];
};

export default function RequestSwapDialog({
  name,
  schedule,
  day,
  receptorId,
  destinationId,
  loggedUserShifts,
}: Props) {
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { createSwapRequest } = useShiftExchangeRequest();
  const { user } = useContext(AuthContext);

  const handleSendRequest = async () => {
    if (!selectedShiftId) {
      setError("Por favor, selecione um turno para oferecer.");
      return;
    }
    if (!destinationId) {
      setError("Turno desejado inválido.");
      return;
    }

    const swapRequestData = {
      receptorId,
      departmentId: user!.department_id,
      originShiftId: selectedShiftId,
      destinationId,
    };

    try {
      await createSwapRequest(swapRequestData);
      setError(null);
      console.log("Solicitação de troca enviada com sucesso!");
    } catch (err) {
      setError("Erro ao enviar a solicitação de troca.");
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Request Swap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Request Shift Swap
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            <div>
              <div className="text-lg">{name}'s Shift</div>
              <div className="flex border-1 px-2 py-5 justify-between rounded-md font-bold items-center text-lg">
                <div className="text-black">{day}</div>
                <div className="text-green-900">{schedule}</div>
              </div>
            </div>
            <div>
              <div className="text-lg">Selecione seu turno para oferecer:</div>
              <SelectExchangeShift
                shifts={loggedUserShifts}
                onShiftSelect={(shiftId) => setSelectedShiftId(shiftId)}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose>
            <Button>Cancel</Button>
          </DialogClose>
          <Button
            className="bg-orange-500 text-white font-bold shadow-md"
            onClick={handleSendRequest}
          >
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
