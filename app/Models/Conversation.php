<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = [
        'sender',
        'receiver',
        'last_message_id',
    ];

    public function lastMessage()
    {
        return $this->belongsTo(Message::class, 'last_message_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender');
    }
}
