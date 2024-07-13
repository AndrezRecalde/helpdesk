<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\CheckInOut;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CheckInOutController extends Controller
{
    function getMarcacionesForUser(Request $request): JsonResponse
    {
        $checks = CheckInOut::from('CHECKINOUT as ch')
            ->selectRaw('ch.ID, ch.USERID, ui.NAME, ch.CHECKTIME, ch.CHECKTYPE,
                             ch.SENSORID, ch.MARCTYPE')
            ->join('USERINFO as ui', 'ui.USERID', 'ch.USERID')
            ->byUserId($request->asi_id_reloj)
            ->byFechas($request->fecha_inicio, $request->fecha_fin)
            ->get();

        return response()->json(['status' => MsgStatus::Success, 'checks' => $checks], 200);
    }
}
