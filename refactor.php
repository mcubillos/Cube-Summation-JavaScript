public function post_confirm(){
	$id = Input::get('service_id');
	$servicio = Service::find($id);
	if($servicio!=NULL){
		$status = $servicio->status_id;
		if($servicio->driver_id==NULL && $status=='1'){
			$driver_id = Input::get('driver_id');
			$servicio = Service::update{$id,array(
				'driver_id' => $driver_id,
				'status_id' => '2'
			)}:
			Driver::update($driver_id , array("available" =>'0'));
			$driverTmp = Driver::find($driver_id);
			Service::update($id,array('car_id'=>$driverTmp->car_id));
			
			//Notoficar al usuario
			$pushMessage = 'Tu servicio ha sido confirmado';
			$push = Push::make();
			$user_uiid = $servicio->user->uiid;
			if($user_uiid != ''){
				if($servicio->user->type == '1'){
					$result =$push->ios($user_uiid,$pushMessage,1,'honk.wav,'Open', array('serviceId'=>$servicio->id));
				}else{
					$result =$push->android2($user_uiid,$pushMessage,1,'default','Open', array('serviceId'=>$servicio->id));
				}
			}else{
				return Response::json(array('error')=>'0');
			}
		} elseif ($status == '6'){
			return Response::json(array('error'=>'2'));
		}else{
			return Response::json(array('error'=>'1'));
		}
	}else{
		return Response::json(array('error'=>'3'));
	}
}

Malas practicas:

1. Dejar codigo no funcional comentariado
2. Repetición a la hora de obtener y declarar variables ej: $servicio es declarado dos veces 
3. No declarar como variables objetos que se usan constantemente
4. Se pueden anidar if para evitar if de más.

