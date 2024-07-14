<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\CheckInOut;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CheckInOutController extends Controller
{
    function getMarcacionesForUser(Request $request): JsonResponse
    {

        $results = DB::select('CALL GetCheckinOutData(?, ?, ?)', [$request->badgenumber, $request->fecha_inicio, $request->fecha_fin]);

        return response()->json(['status' => MsgStatus::Success, 'results' => $results], 200);
    }
}
