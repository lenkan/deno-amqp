
export  type Method = { classId: 10; methodId: 10;["version-major"]: any;["version-minor"]: any;["server-properties"]: any;["mechanisms"]: any;["locales"]: any,{ classId: 10;methodId: 11;["client-properties"]: any;["mechanism"]: any;["response"]: any;["locale"]: any,{ classId: 10;methodId: 20;["challenge"]: any,{ classId: 10;methodId: 21;["response"]: any,{ classId: 10;methodId: 30;["channel-max"]: any;["frame-max"]: any;["heartbeat"]: any,{ classId: 10;methodId: 31;["channel-max"]: any;["frame-max"]: any;["heartbeat"]: any,{ classId: 10;methodId: 40;["virtual-host"]: any;["capabilities"]: any;["insist"]: any,{ classId: 10;methodId: 41;["known-hosts"]: any,{ classId: 10;methodId: 50;["reply-code"]: any;["reply-text"]: any;["class-id"]: any;["method-id"]: any,{ classId: 10;methodId: 51,{ classId: 10;methodId: 60;["reason"]: any,{ classId: 10;methodId: 61,{ classId: 10;methodId: 70;["new-secret"]: any;["reason"]: any,{ classId: 10;methodId: 71,{ classId: 20;methodId: 10;["out-of-band"]: any,{ classId: 20;methodId: 11;["channel-id"]: any,{ classId: 20;methodId: 20;["active"]: any,{ classId: 20;methodId: 21;["active"]: any,{ classId: 20;methodId: 40;["reply-code"]: any;["reply-text"]: any;["class-id"]: any;["method-id"]: any,{ classId: 20;methodId: 41,{ classId: 30;methodId: 10;["realm"]: any;["exclusive"]: any;["passive"]: any;["active"]: any;["write"]: any;["read"]: any,{ classId: 30;methodId: 11;["ticket"]: any,{ classId: 40;methodId: 10;["ticket"]: any;["exchange"]: any;["type"]: any;["passive"]: any;["durable"]: any;["auto-delete"]: any;["internal"]: any;["nowait"]: any;["arguments"]: any,{ classId: 40;methodId: 11,{ classId: 40;methodId: 20;["ticket"]: any;["exchange"]: any;["if-unused"]: any;["nowait"]: any,{ classId: 40;methodId: 21,{ classId: 40;methodId: 30;["ticket"]: any;["destination"]: any;["source"]: any;["routing-key"]: any;["nowait"]: any;["arguments"]: any,{ classId: 40;methodId: 31,{ classId: 40;methodId: 40;["ticket"]: any;["destination"]: any;["source"]: any;["routing-key"]: any;["nowait"]: any;["arguments"]: any,{ classId: 40;methodId: 51,{ classId: 50;methodId: 10;["ticket"]: any;["queue"]: any;["passive"]: any;["durable"]: any;["exclusive"]: any;["auto-delete"]: any;["nowait"]: any;["arguments"]: any,{ classId: 50;methodId: 11;["queue"]: any;["message-count"]: any;["consumer-count"]: any,{ classId: 50;methodId: 20;["ticket"]: any;["queue"]: any;["exchange"]: any;["routing-key"]: any;["nowait"]: any;["arguments"]: any,{ classId: 50;methodId: 21,{ classId: 50;methodId: 30;["ticket"]: any;["queue"]: any;["nowait"]: any,{ classId: 50;methodId: 31;["message-count"]: any,{ classId: 50;methodId: 40;["ticket"]: any;["queue"]: any;["if-unused"]: any;["if-empty"]: any;["nowait"]: any,{ classId: 50;methodId: 41;["message-count"]: any,{ classId: 50;methodId: 50;["ticket"]: any;["queue"]: any;["exchange"]: any;["routing-key"]: any;["arguments"]: any,{ classId: 50;methodId: 51,{ classId: 60;methodId: 10;["prefetch-size"]: any;["prefetch-count"]: any;["global"]: any,{ classId: 60;methodId: 11,{ classId: 60;methodId: 20;["ticket"]: any;["queue"]: any;["consumer-tag"]: any;["no-local"]: any;["no-ack"]: any;["exclusive"]: any;["nowait"]: any;["arguments"]: any,{ classId: 60;methodId: 21;["consumer-tag"]: any,{ classId: 60;methodId: 30;["consumer-tag"]: any;["nowait"]: any,{ classId: 60;methodId: 31;["consumer-tag"]: any,{ classId: 60;methodId: 40;["ticket"]: any;["exchange"]: any;["routing-key"]: any;["mandatory"]: any;["immediate"]: any,{ classId: 60;methodId: 50;["reply-code"]: any;["reply-text"]: any;["exchange"]: any;["routing-key"]: any,{ classId: 60;methodId: 60;["consumer-tag"]: any;["delivery-tag"]: any;["redelivered"]: any;["exchange"]: any;["routing-key"]: any,{ classId: 60;methodId: 70;["ticket"]: any;["queue"]: any;["no-ack"]: any,{ classId: 60;methodId: 71;["delivery-tag"]: any;["redelivered"]: any;["exchange"]: any;["routing-key"]: any;["message-count"]: any,{ classId: 60;methodId: 72;["cluster-id"]: any,{ classId: 60;methodId: 80;["delivery-tag"]: any;["multiple"]: any,{ classId: 60;methodId: 90;["delivery-tag"]: any;["requeue"]: any,{ classId: 60;methodId: 100;["requeue"]: any,{ classId: 60;methodId: 110;["requeue"]: any,{ classId: 60;methodId: 111,{ classId: 60;methodId: 120;["delivery-tag"]: any;["multiple"]: any;["requeue"]: any,{ classId: 90;methodId: 10,{ classId: 90;methodId: 11,{ classId: 90;methodId: 20,{ classId: 90;methodId: 21,{ classId: 90;methodId: 30,{ classId: 90;methodId: 31,{ classId: 85;methodId: 10;["nowait"]: any,{ classId: 85;methodId: 11


function encodeMethod(method: Method): MethodFrame {
  
    if(method.classId === 10) {
      
        if(method.methodId === 10) {
          const encoder = createEncoder();
          encoder.encodeOctet(method["version-major"] !== undefined ? method["version-major"] : 0)
encoder.encodeOctet(method["version-minor"] !== undefined ? method["version-minor"] : 9)
encoder.encodeTable(method["server-properties"])
encoder.encodeLongString(method["mechanisms"] !== undefined ? method["mechanisms"] : "PLAIN")
encoder.encodeLongString(method["locales"] !== undefined ? method["locales"] : "en_US")
        }
        
        if(method.methodId === 11) {
          const encoder = createEncoder();
          encoder.encodeTable(method["client-properties"])
encoder.encodeShortString(method["mechanism"] !== undefined ? method["mechanism"] : "PLAIN")
encoder.encodeLongString(method["response"])
encoder.encodeShortString(method["locale"] !== undefined ? method["locale"] : "en_US")
        }
        
        if(method.methodId === 20) {
          const encoder = createEncoder();
          encoder.encodeLongString(method["challenge"])
        }
        
        if(method.methodId === 21) {
          const encoder = createEncoder();
          encoder.encodeLongString(method["response"])
        }
        
        if(method.methodId === 30) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["channel-max"] !== undefined ? method["channel-max"] : 0)

encoder.encodeShortUint(method["heartbeat"] !== undefined ? method["heartbeat"] : 0)
        }
        
        if(method.methodId === 31) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["channel-max"] !== undefined ? method["channel-max"] : 0)

encoder.encodeShortUint(method["heartbeat"] !== undefined ? method["heartbeat"] : 0)
        }
        
        if(method.methodId === 40) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["virtual-host"] !== undefined ? method["virtual-host"] : "/")
encoder.encodeShortString(method["capabilities"] !== undefined ? method["capabilities"] : "")

        }
        
        if(method.methodId === 41) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["known-hosts"] !== undefined ? method["known-hosts"] : "")
        }
        
        if(method.methodId === 50) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["reply-code"])
encoder.encodeShortString(method["reply-text"] !== undefined ? method["reply-text"] : "")
encoder.encodeShortUint(method["class-id"])
encoder.encodeShortUint(method["method-id"])
        }
        
        if(method.methodId === 51) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 60) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["reason"] !== undefined ? method["reason"] : "")
        }
        
        if(method.methodId === 61) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 70) {
          const encoder = createEncoder();
          encoder.encodeLongString(method["new-secret"])
encoder.encodeShortString(method["reason"])
        }
        
        if(method.methodId === 71) {
          const encoder = createEncoder();
          
        }
        
    }
    
    if(method.classId === 20) {
      
        if(method.methodId === 10) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["out-of-band"] !== undefined ? method["out-of-band"] : "")
        }
        
        if(method.methodId === 11) {
          const encoder = createEncoder();
          encoder.encodeLongString(method["channel-id"] !== undefined ? method["channel-id"] : "")
        }
        
        if(method.methodId === 20) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 21) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 40) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["reply-code"])
encoder.encodeShortString(method["reply-text"] !== undefined ? method["reply-text"] : "")
encoder.encodeShortUint(method["class-id"])
encoder.encodeShortUint(method["method-id"])
        }
        
        if(method.methodId === 41) {
          const encoder = createEncoder();
          
        }
        
    }
    
    if(method.classId === 30) {
      
        if(method.methodId === 10) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["realm"] !== undefined ? method["realm"] : "/data")





        }
        
        if(method.methodId === 11) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 1)
        }
        
    }
    
    if(method.classId === 40) {
      
        if(method.methodId === 10) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["exchange"])
encoder.encodeShortString(method["type"] !== undefined ? method["type"] : "direct")





encoder.encodeTable(method["arguments"] !== undefined ? method["arguments"] : {})
        }
        
        if(method.methodId === 11) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 20) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["exchange"])


        }
        
        if(method.methodId === 21) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 30) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["destination"])
encoder.encodeShortString(method["source"])
encoder.encodeShortString(method["routing-key"] !== undefined ? method["routing-key"] : "")

encoder.encodeTable(method["arguments"] !== undefined ? method["arguments"] : {})
        }
        
        if(method.methodId === 31) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 40) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["destination"])
encoder.encodeShortString(method["source"])
encoder.encodeShortString(method["routing-key"] !== undefined ? method["routing-key"] : "")

encoder.encodeTable(method["arguments"] !== undefined ? method["arguments"] : {})
        }
        
        if(method.methodId === 51) {
          const encoder = createEncoder();
          
        }
        
    }
    
    if(method.classId === 50) {
      
        if(method.methodId === 10) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["queue"] !== undefined ? method["queue"] : "")





encoder.encodeTable(method["arguments"] !== undefined ? method["arguments"] : {})
        }
        
        if(method.methodId === 11) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["queue"])


        }
        
        if(method.methodId === 20) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["queue"] !== undefined ? method["queue"] : "")
encoder.encodeShortString(method["exchange"])
encoder.encodeShortString(method["routing-key"] !== undefined ? method["routing-key"] : "")

encoder.encodeTable(method["arguments"] !== undefined ? method["arguments"] : {})
        }
        
        if(method.methodId === 21) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 30) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["queue"] !== undefined ? method["queue"] : "")

        }
        
        if(method.methodId === 31) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 40) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["queue"] !== undefined ? method["queue"] : "")



        }
        
        if(method.methodId === 41) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 50) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["queue"] !== undefined ? method["queue"] : "")
encoder.encodeShortString(method["exchange"])
encoder.encodeShortString(method["routing-key"] !== undefined ? method["routing-key"] : "")
encoder.encodeTable(method["arguments"] !== undefined ? method["arguments"] : {})
        }
        
        if(method.methodId === 51) {
          const encoder = createEncoder();
          
        }
        
    }
    
    if(method.classId === 60) {
      
        if(method.methodId === 10) {
          const encoder = createEncoder();
          
encoder.encodeShortUint(method["prefetch-count"] !== undefined ? method["prefetch-count"] : 0)

        }
        
        if(method.methodId === 11) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 20) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["queue"] !== undefined ? method["queue"] : "")
encoder.encodeShortString(method["consumer-tag"] !== undefined ? method["consumer-tag"] : "")




encoder.encodeTable(method["arguments"] !== undefined ? method["arguments"] : {})
        }
        
        if(method.methodId === 21) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["consumer-tag"])
        }
        
        if(method.methodId === 30) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["consumer-tag"])

        }
        
        if(method.methodId === 31) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["consumer-tag"])
        }
        
        if(method.methodId === 40) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["exchange"] !== undefined ? method["exchange"] : "")
encoder.encodeShortString(method["routing-key"] !== undefined ? method["routing-key"] : "")


        }
        
        if(method.methodId === 50) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["reply-code"])
encoder.encodeShortString(method["reply-text"] !== undefined ? method["reply-text"] : "")
encoder.encodeShortString(method["exchange"])
encoder.encodeShortString(method["routing-key"])
        }
        
        if(method.methodId === 60) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["consumer-tag"])


encoder.encodeShortString(method["exchange"])
encoder.encodeShortString(method["routing-key"])
        }
        
        if(method.methodId === 70) {
          const encoder = createEncoder();
          encoder.encodeShortUint(method["ticket"] !== undefined ? method["ticket"] : 0)
encoder.encodeShortString(method["queue"] !== undefined ? method["queue"] : "")

        }
        
        if(method.methodId === 71) {
          const encoder = createEncoder();
          

encoder.encodeShortString(method["exchange"])
encoder.encodeShortString(method["routing-key"])

        }
        
        if(method.methodId === 72) {
          const encoder = createEncoder();
          encoder.encodeShortString(method["cluster-id"] !== undefined ? method["cluster-id"] : "")
        }
        
        if(method.methodId === 80) {
          const encoder = createEncoder();
          

        }
        
        if(method.methodId === 90) {
          const encoder = createEncoder();
          

        }
        
        if(method.methodId === 100) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 110) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 111) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 120) {
          const encoder = createEncoder();
          


        }
        
    }
    
    if(method.classId === 90) {
      
        if(method.methodId === 10) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 11) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 20) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 21) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 30) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 31) {
          const encoder = createEncoder();
          
        }
        
    }
    
    if(method.classId === 85) {
      
        if(method.methodId === 10) {
          const encoder = createEncoder();
          
        }
        
        if(method.methodId === 11) {
          const encoder = createEncoder();
          
        }
        
    }
    
}

