<?php

namespace App\Http\Controllers;



use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{


    // INDEX
    /*  public function index(){
          $impfung = \App\Models\Impfung::all();
          return view('Impfung.index',compact('impfung'));
      }
    */

    public function index()
    {
        $user = User::all();
        return $user;
    }

    // SHOW
    public function show($user)
    {
        $user = User::find($user);
        return view('user.show', compact('user'));
    }



//UPDATE
    public function update(Request $request, int $SVN) : JsonResponse
    {
        DB::beginTransaction();
        try {

            $user = User::where('SVN', $SVN)->first();
            if ($user != null) {
                $request = $this->parseRequest($request);
                $user->update($request->all());

                // save
                if (isset($request['user']) && is_array($request['user'])) {
                    foreach ($request['user'] as $o) {
                        $user = User::firstOrNew(['SVN' => $o['SVN']]);

                       //
                        $user->orte()->save($user);
                    }
                }

                $user->save();
            }

            //
            DB::commit();
            $user = User::with(['user'])
                ->where('SVN', $SVN)->first();
            // return a vaild http response
            return response()->json("User is updated". $user, 201);
        }

            //ROLLBACK
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating User failed: " . $e->getMessage(), 420);
        }
    }


// SAVE
    public function save (Request $request) : JsonResponse
    {

        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try {

            $ort = User::create($request->all());

            DB::commit();
            return response()->json("User saved ". $ort, 201);
        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json("saving  User failed: " . $e->getMessage(), 420);

        }

    }


// DELET
    public function delete(string $SVN) : JsonResponse {

        $users = User::where('SVN', $SVN)->first();
        if ($users != null) {
            $users->delete();
        }
        else {
            throw new \Exception("User does not exist");
        }
        return response()->json('users (' .$SVN. ') successfully deleted', 200);
    }


    //  FINDBYSVN
    public function findBySVN(string $SVN) : User
    {
        $SVN = User::where('SVN', $SVN)->with(['SVN'])->first();
        return $SVN;
    }

    public function checkSVN(string $SVN)
    {
        $SVN = User::where ('SVN', $SVN)->first();
        return $SVN != null ? response()->json(true, 200) : response()->json(false, 200);
    }



// ISADMIN x
    public function isAdmin(int $SVN) : bool {
        $user = User::where('SVN', $SVN)->first();
        return $user->isAdmin;
    }


    //
    private function parseRequest(Request $request) : Request {
        // get birthdate and convert it - its in ISO 8601, e.g. "2018-01-01T23:00:00.000Z"

        if (isset($request['password'])) {
            $request['password'] = bcrypt($request['password']);
        }
        if (isset($request['birthdate'])) {
            $birthdate = date_create_from_format('Y.m.d', $request['birthdate']);

            // $birthdate = date_create_from_format('Y.m.d', $request['birthdate']);
            $request['birthdate'] = $birthdate;
        }
        return $request;
    }



// ENDE
}

