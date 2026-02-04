<?php

namespace App\Mail;

use App\Models\NomDenuncia;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DenunciaMail extends Mailable
{
    use Queueable, SerializesModels;

    public $denuncia;
    public $tipo; // 'nueva' o 'respuesta'

    /**
     * Create a new message instance.
     */
    public function __construct(NomDenuncia $denuncia, string $tipo = 'nueva')
    {
        $this->denuncia = $denuncia;
        $this->tipo = $tipo;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $subject = $this->tipo === 'nueva'
            ? 'Nueva Denuncia Recibida - ' . $this->denuncia->numero_denuncia
            : 'Respuesta a su Denuncia - ' . $this->denuncia->numero_denuncia;

        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $view = $this->tipo === 'nueva'
            ? 'mail.denuncias.nueva-denuncia'
            : 'mail.denuncias.respuesta-denuncia';

        return new Content(
            markdown: $view,
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}
