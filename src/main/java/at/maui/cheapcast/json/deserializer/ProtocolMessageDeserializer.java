/*
 * Copyright 2013 Sebastian Mauer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package at.maui.cheapcast.json.deserializer;

import at.maui.cheapcast.chromecast.model.ProtocolMessage;
import at.maui.cheapcast.chromecast.model.ramp.RampMessage;
import com.google.gson.*;
import java.lang.reflect.Type;


public class ProtocolMessageDeserializer implements JsonDeserializer<ProtocolMessage> {
    @Override
    public ProtocolMessage deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
        ProtocolMessage pm;

        if(jsonElement.isJsonArray()) {
            JsonArray arr = jsonElement.getAsJsonArray();

            pm = new ProtocolMessage();
            pm.setProtocol(arr.get(0).getAsString());

            if(pm.getProtocol().equals("ramp")) {
                pm.setPayload((RampMessage)jsonDeserializationContext.deserialize(arr.get(1), RampMessage.class));
            }
            return pm;
        }

        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
