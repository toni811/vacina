<?php


namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class AuthController extends Controller
    //
{

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login() {
        $credentials = request(['email', 'password']);
        var_dump("email");
        // hier wird nachgesehen ob pw, email passt--> wenn nicht error --> sonst token übergeben
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized bla'], 401);
        }

        // wird Token übergeben
        return $this->respondWithToken($token);

    }


    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'logged out!']);
    }

    public function refresh() {
        return $this->respondWithToken(auth()->refresh());
    }


    protected function respondWithToken(string $token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

}
//test23423
