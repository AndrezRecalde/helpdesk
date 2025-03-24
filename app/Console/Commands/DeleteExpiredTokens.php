<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Sanctum\PersonalAccessToken;
use Carbon\Carbon;

class DeleteExpiredTokens extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tokens:clean';


    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Eliminar tokens de acceso personal caducados';



    /**
     * Execute the console command.
     */
    public function handle()
    {
        // 🔥 Eliminar tokens cuya fecha de expiración ya pasó
        $deleted = PersonalAccessToken::where('expires_at', '<', Carbon::now())->delete();

        $this->info("Se eliminaron {$deleted} tokens caducados.");
    }
}
