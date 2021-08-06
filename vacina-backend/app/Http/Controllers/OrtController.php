<?php

namespace App\Http\Controllers;

use App\Models\Ort;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrtController extends Controller
{
    //

    // SHOW ALL
    public function index()
    {
        /* load all ort and relations with eager loading,
        which means "load all related objects" */
        $ort = Ort::all();
        return $ort;
    }
 /////ALTER TEST
// DELET
    public function delete(string $address) : JsonResponse {

        $ort = Ort::where('address', $address)->first();
        if ($ort != null) {
            $ort->delete();
        }
        else {
            throw new \Exception("ort does not exist");
        }
        return response()->json('ort (' .$address. ') successfully deleted', 200);
    }

//UPDATE
    public function update(Request $request, string $address) : JsonResponse
    {
        DB::beginTransaction();
        try {

            $ort = Ort::where('address', $address)->first();
            if ($ort != null) {
                $request = $this->parseRequest($request);
                $ort->update($request->all());

                // save
                if (isset($request['ort']) && is_array($request['ort'])) {
                    foreach ($request['ort'] as $o) {
                        $ort = Ort::firstOrNew(['address' => $o['address']]);
                        $ort->orte()->save($ort);
                    }
                }

                $ort->save();
            }

            //
            DB::commit();
            $ort = Ort::with(['ort'])
                ->where('address', $address)->first();
            // return a vaild http response
            return response()->json("ort is updated". $ort, 201);
        }

            //ROLLBACK
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating ort failed: " . $e->getMessage(), 420);
        }
    }


// SAVE --> neuen Ort erstellen
    public function save (Request $request) : JsonResponse
    {

        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try {

            $ort = Ort::create($request->all());

            DB::commit();
            return response()->json("Ort saved ". $ort, 201);
        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json("saving ort failed: " . $e->getMessage(), 420);

        }

    }

    //
    private function parseRequest(Request $request) : Request {
        // get date and convert it - its in ISO 8601, e.g. "2018-01-01T23:00:00.000Z"
        $date = new \DateTime($request->date);
        $request['date'] = $date;
        return $request;
    }

//ENDE
}