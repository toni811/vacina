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

public function save (Request $request) : JsonResponse
{

    $request = $this->parseRequest($request);

    //var_dump($request->all()); die();
    //
    //var_dump($request['ort_id']); die(); Postman-> NULL
    var_dump($request['ort']);

    DB::beginTransaction();

    try {
        //var_dump($request['ort_id']);
        //$defaultort = '1';

        //if (isset($request[$defaultort])) {
       if (isset($request['ort']['ort_id'])) {
            $loc = Ort::find($request['ort']['ort_id']);
           var_dump($request['ort']['ort_id']);
        } else {

            throw new \Exception("ort id is missing.");
        }


        $vac = new Impfung();
        $vac->date = $request->date;
        $vac->title = $request->title;
        $vac->description = $request->description;
        $vac->MaxMember = $request->MaxMember;
        $vac->appointment = $request->appointment;

        // Zusammenfügen
        $vac->ort()->associate($loc);
        $vac->save();

        DB::commit();
        return response()->json($vac, 201);



/*

 // falsch
    try {

        $impfung = Impfung::create($request->all());

        //
        //

        if ($request['ort'] ) {
            foreach ($request['ort'] as $o) {
                $orte = Ort::firstOrNew([
                    'PLZ' => $o['PLZ'],
                    'location' => $o['location'],
                    'address' => $o['address'],
                    'description' => $o['description'],

                ]);
                // assign image to book
                $impfung->ort()->save($orte);
            }
        }

        DB::commit();
        return response()->json($orte, 201);

        /*
 // Halb richtige Variante
        try {

            //saves data of impfung
            $impfung = Impfung::create($request->all());

                // Ort wird gesucht
                // if (isset($request['ort']) && is_array($request['ort'])){
                    // if (isset($request['ort'])){
                         if (isset($request['ort'])){
                        // var_dump($request['ort']['ort_id']); die();
                    if(isset($request['ort']['ort_id'])){
                        $ort_id = $request['ort']['ort_id'];
                        $ort = Ort::find($ort_id);
                    }
                    else {

                        throw new \Exception("Ort id is missing.");
                    }

            } else {

                throw new \Exception("Ort is missing.");
            }

            // Ort wird mit Impfung vereint
            $impfung->ort()->associate($ort);
            $impfung->save();


            DB::commit();
            // return a vaild http response
            return response()->json("saved". $impfung, 201);
        }

        */

    } catch
        (\Exception $e) {
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

                if (isset($request['ort']['ort_id'])) {
                    $loc = Ort::find($request['ort']['ort_id']);
                    var_dump($request['ort']['ort_id']);
                } else {
                    throw new \Exception("Ort id is missing.");
                }


                $impfung->ort()->associate($loc);
                $impfung->save();



            }

            //
            DB::commit();

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
