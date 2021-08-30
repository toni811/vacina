<?php

namespace App\Http\Controllers;

use App\Models\Impfung;
use App\Models\Ort;
use Illuminate\Http\Request;

//
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;




class ImpfungController extends Controller
{
    //return view('Impfung.index',compact('impfung'));

    // INDEX
  /*  public function index(){
        $impfung = \App\Models\Impfung::all();
        return view('Impfung.index',compact('impfung'));
    }
  */

    public function index(){
        $impfung = \App\Models\Impfung::with(['ort'])-> get();
        return $impfung;
    }

    // SHOW
    public function show($impfung){
        $impfung = Impfung::find($impfung);
        return view('Impfung.show',compact('impfung'));
    }



    //  FINDBYTITLE
    public function findByTitle(string $title) : Impfung
    {
        $title = Impfung::where('title', $title)->with(['ort'])->first();
        return $title;
    }

    public function checkTitle(string $title)
    {
        $impfung = Impfung::where ('title', $title)->first();
        return $impfung != null ? response()->json(true, 200) : response()->json(false, 200);
    }

    // SPEICHERN
///////////////////////////////////////////////

public function save (Request $request) : JsonResponse {

    $request = $this->parseRequest($request);

   // var_dump($request->all()); die();

    DB::beginTransaction();
    try {

        //saves data of impfung
        $impfung = Impfung::create($request->all());


        if (isset($request['ort'])) {
            $ort = Ort::find($request->ort);
        } else {

            throw new \Exception("Ort id is missing.");
        }
        $impfung->ort()->associate($ort);
        $impfung->save();


        DB::commit();
        // return a vaild http response
        return response()->json("saved". $impfung, 201);
    }
    catch (\Exception $e) {
        // rollback all queries
        DB::rollBack();
        return response()->json("saving impfung failed: " . $e->getMessage(), 420);
    }
}
////////////////////////////////////////////////

// UPDATE
    public function update(Request $request, string $title) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $impfung = Impfung::with(['ort'])
                ->where('title', $title)->first();
            if ($impfung != null) {
                $request = $this->parseRequest($request);
                $impfung->update($request->all());
                //delete all old orte
                $impfung->orte()->delete();
                // save

                if (isset($request['ort_id'])) {
                    $ort = Ort::find($request->ort_id);
                } else {
                    throw new \Exception("Ort id is missing.");
                }
                $impfung->ort()->associate($ort);
                $impfung->save();



            }

            //
            DB::commit();
            //$impfung1 = Impfung::with(['authors', 'images', 'user'])
            $impfung1 = Impfung::with(['ort'])
                ->where('title', $title)->first();
            // return a vaild http response
            return response()->json("updating succsesful".$impfung1, 201);
        }

        //ROLLBACK
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating failed: " . $e->getMessage(), 420);
        }
    }

// DELET
    public function delete(string $title) : JsonResponse {

       // var_dump("hallo");die();
        $impfung = Impfung::where('title', $title)->first();
        if ($impfung != null) {
            $impfung->delete();
        }
        else {
            throw new \Exception("impfung does not exist");
        }
        return response()->json('impfung (' .$title. ') successfully deleted', 200);
    }


    private function parseRequest(Request $request) : Request {

        $date = new \DateTime($request->date);
        $request['date'] = $date;
        return $request;
    }

    // ENDE
    }
